import { type inferProcedureInput } from "@trpc/server";
import { expect, test, describe, vi, beforeEach } from "vitest";

// Import the actual context creator and router
import { createTRPCContext } from "@/server/api/trpc";
import { appRouter, type AppRouter } from "@/server/api/root";

// Import functions to mock
import { getSession } from "@/server/auth/auth.server";
import { userHasPermission } from "@/server/auth/plugin/permission/service";
import type { CoursePermissionAction } from "@/server/db/schema"; // For typing mock
import { callInvalidate } from "@/lib/cache/callInvalidate";
import { insertLog } from "@/server/api/actions/logs";

// Mock dependencies
vi.mock("@/server/actions/logs", () => ({
  insertLog: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/cache/callInvalidate", () => ({
  callInvalidate: vi.fn(),
}));
vi.mock("@/server/auth/auth.server", () => ({
  getSession: vi.fn(),
}));
vi.mock("@/server/auth/plugin/permission/service", () => ({
  hasPermission: vi.fn(),
}));
// Mock session data based on the structure { session: {...}, user: {...} } | null
const mockUser = {
  id: "user_123",
  name: "Test User",
  role: "user", // Or "admin" if testing admin procedures
  // Add other required user fields based on your actual User type
  // ... other user fields
};

// --- UPDATED mockSessionObject ---
const mockSessionObject = {
  // Existing fields
  id: "session_abc",
  userId: mockUser.id,
  expiresAt: new Date(Date.now() + 3600 * 1000), // Example expiry
  // fresh: false, // This might not be part of the final type, remove if not needed

  // --- ADDED Missing Fields ---
  createdAt: new Date(), // Add a mock creation date
  updatedAt: new Date(), // Add a mock update date
  token: "mock_session_token_12345", // Add a mock token string
  ipAddress: "127.0.0.1", // Optional: Add mock IP or null
  userAgent: "Vitest Test Runner", // Optional: Add mock UA or null
  // Add any other fields present in your actual Session type from the DB/Auth library
};
// --- End of Update ---

const mockAuthenticatedSession = {
  session: mockSessionObject,
  user: mockUser,
};

// ... rest of your test file remains the same ...

// --- Test Suite ---

describe("unitsRouter", () => {
  // Ensure mocks are reset and default behaviors are set before each test
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to logged-in user with permission for protected routes
    vi.mocked(getSession).mockResolvedValue(mockAuthenticatedSession);
    vi.mocked(userHasPermission).mockResolvedValue(true);
  });

  // Helper to create context and caller
  const setupTest = async (
    sessionOverride?: typeof mockAuthenticatedSession | null,
  ) => {
    if (sessionOverride !== undefined) {
      vi.mocked(getSession).mockResolvedValue(sessionOverride);
    }
    // Pass mock headers (can be empty if not used by procedures)
    const ctx = await createTRPCContext({ headers: new Headers() });
    const caller = appRouter.createCaller(ctx);
    return { ctx, caller };
  };

  describe("getUnitsForDashboard (public)", () => {
    test("should return units when logged out", async () => {
      const { caller } = await setupTest(null); // Explicitly set session to null
      // Mock db response if needed
      // vi.spyOn(ctx.db.query.units, 'findMany').mockResolvedValue([...]);

      type Input = inferProcedureInput<
        AppRouter["units"]["getUnitsForDashboard"]
      >;
      const input: Input = { courseId: "course_abc" };
      const result = await caller.units.getUnitsForDashboard(input);

      expect(result).toBeInstanceOf(Array);
      // Add more specific assertions based on expected data or mocks
    });

    test("should return units when logged in", async () => {
      const { caller } = await setupTest(); // Uses default logged-in session
      type Input = inferProcedureInput<
        AppRouter["units"]["getUnitsForDashboard"]
      >;
      const input: Input = { courseId: "course_abc" };
      const result = await caller.units.getUnitsForDashboard(input);

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("update (protected, permission: edit_unit)", () => {
    const permissionNeeded: CoursePermissionAction = "edit_unit";

    test("should update a unit when authorized", async () => {
      const { caller } = await setupTest(); // Uses default logged-in + permission=true
      // Mock DB update if needed
      // vi.spyOn(ctx.db, 'update')...mockReturnValueOnce({ returning: vi.fn().mockResolvedValue([{ id: 'unit_xyz', courseId: 'course_abc' }]) });

      type Input = inferProcedureInput<AppRouter["units"]["update"]>;
      const input: Input = {
        courseId: "course_abc", // Required by permission middleware
        data: {
          id: "unit_xyz",
          name: "Updated Unit Name",
        },
      };

      await expect(caller.units.update(input)).resolves.toBeUndefined();

      // Verify permission check was called correctly
      expect(userHasPermission).toHaveBeenCalledWith({
        userId: mockUser.id,
        courseId: input.courseId,
        permission: permissionNeeded,
      });
      // Check insertLog (may need await/waitFor depending on 'after' behavior)
      // expect(vi.mocked(insertLog)).toHaveBeenCalledWith({ userId: mockUser.id, action: 'UPDATE_UNIT' });
    });

    test("should throw UNAUTHORIZED if user lacks permission", async () => {
      vi.mocked(userHasPermission).mockResolvedValue(false); // Override permission mock
      const { caller } = await setupTest();

      type Input = inferProcedureInput<AppRouter["units"]["update"]>;
      const input: Input = {
        courseId: "course_abc",
        data: { id: "unit_xyz", name: "Updated Unit Name" },
      };

      await expect(caller.units.update(input)).rejects.toThrowError(
        /You do not have permission/, // Or check TRPCError code 'UNAUTHORIZED'
      );
      expect(userHasPermission).toHaveBeenCalledWith({
        userId: mockUser.id,
        courseId: input.courseId,
        permission: permissionNeeded,
      });
      expect(vi.mocked(callInvalidate)).not.toHaveBeenCalled();
      expect(vi.mocked(insertLog)).not.toHaveBeenCalled();
    });

    test("should throw UNAUTHORIZED if not logged in", async () => {
      const { caller } = await setupTest(null); // Logged out

      type Input = inferProcedureInput<AppRouter["units"]["update"]>;
      const input: Input = {
        courseId: "course_abc",
        data: { id: "unit_xyz", name: "Updated Unit Name" },
      };

      // protectedProcedure runs first
      await expect(caller.units.update(input)).rejects.toThrowError(
        /UNAUTHORIZED/,
      );
      expect(userHasPermission).not.toHaveBeenCalled(); // Permission check is not reached
    });

    test("should throw BAD_REQUEST if input lacks courseId", async () => {
      const { caller } = await setupTest(); // Logged in, has permission

      // Intentionally create invalid input (missing top-level courseId)
      const invalidInput = {
        data: {
          id: "unit_xyz",
          name: "Updated Unit Name",
          // courseId: "course_abc", // Missing from the correct place
        },
      };

      await expect(
        // Use 'as any' or @ts-expect-error to bypass TypeScript check for the test
        caller.units.update(invalidInput as any),
      ).rejects.toThrowError(/Input validation failed: requires 'courseId'/); // Check TRPCError code 'BAD_REQUEST'

      expect(userHasPermission).not.toHaveBeenCalled(); // Input validation fails before permission check
    });

    test("should throw NOT_FOUND if unit doesn't exist", async () => {
      const { caller, ctx } = await setupTest(); // Logged in, has permission
      // Mock db update to return empty array
      const updateMock = vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([]),
        where: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
      });
      vi.spyOn(ctx.db, "update").mockImplementation(updateMock);

      type Input = inferProcedureInput<AppRouter["units"]["update"]>;
      const input: Input = {
        courseId: "course_abc",
        data: { id: "unit_nonexistent", name: "Test" },
      };

      await expect(caller.units.update(input)).rejects.toThrowError(
        /Unit not found/, // Check TRPCError code 'NOT_FOUND'
      );
      expect(userHasPermission).toHaveBeenCalledOnce(); // Permission check should still happen
    });
  });

  describe("reorder (protected, permission: edit_unit)", () => {
    const permissionNeeded: CoursePermissionAction = "edit_unit";

    test("should reorder units when authorized", async () => {
      const { caller } = await setupTest();
      // Mock DB transaction if needed
      // vi.spyOn(ctx.db, 'transaction')...

      type Input = inferProcedureInput<AppRouter["units"]["reorder"]>;
      const input: Input = {
        courseId: "course_abc", // Required by permission middleware
        data: [
          { id: "unit_1", position: 1 },
          { id: "unit_2", position: 2 },
        ],
      };

      await expect(caller.units.reorder(input)).resolves.toBeUndefined();

      expect(userHasPermission).toHaveBeenCalledWith({
        userId: mockUser.id,
        courseId: input.courseId,
        permission: permissionNeeded,
      });
      expect(vi.mocked(callInvalidate)).toHaveBeenCalledOnce();
      // Check insertLog
      // expect(vi.mocked(insertLog)).toHaveBeenCalledWith({ userId: mockUser.id, action: 'REORDER_UNIT', courseId: 'course_abc' });
    });

    test("should throw UNAUTHORIZED if user lacks permission", async () => {
      vi.mocked(userHasPermission).mockResolvedValue(false);
      const { caller } = await setupTest();

      type Input = inferProcedureInput<AppRouter["units"]["reorder"]>;
      const input: Input = {
        courseId: "course_abc",
        data: [{ id: "unit_1", position: 1 }],
      };

      await expect(caller.units.reorder(input)).rejects.toThrowError(
        /You do not have permission/,
      );
      expect(userHasPermission).toHaveBeenCalledOnce();
    });

    test("should throw BAD_REQUEST if input lacks courseId", async () => {
      const { caller } = await setupTest();
      const invalidInput = {
        // courseId: "course_abc", // Missing
        data: [{ id: "unit_1", position: 1 }],
      };

      //@ts-expect-error - Input is invalid
      await expect(caller.units.reorder(invalidInput)).rejects.toThrowError(
        /Input validation failed: requires 'courseId'/,
      );
      expect(userHasPermission).not.toHaveBeenCalled();
    });

    // Add UNAUTHORIZED test if needed (similar to update)
  });

  describe("getMinimalUnit (protected)", () => {
    test("should return minimal unit data when logged in", async () => {
      const { caller, ctx } = await setupTest();
      // Mock DB findFirst if needed
      // vi.spyOn(ctx.db.query.units, 'findFirst')...

      type Input = inferProcedureInput<AppRouter["units"]["getMinimalUnit"]>;
      const input: Input = { unitId: "unit_xyz" };
      const result = await caller.units.getMinimalUnit(input);

      // Assertions depend on DB state/mock
      expect(result).toBeDefined();
      // expect(result).toMatchObject({ id: 'unit_xyz', ... });
    });

    test("should throw UNAUTHORIZED if not logged in", async () => {
      const { caller } = await setupTest(null);
      type Input = inferProcedureInput<AppRouter["units"]["getMinimalUnit"]>;
      const input: Input = { unitId: "unit_xyz" };

      await expect(caller.units.getMinimalUnit(input)).rejects.toThrowError(
        /UNAUTHORIZED/,
      );
    });
  });

  describe("create (protected, permission: edit_unit)", () => {
    const permissionNeeded: CoursePermissionAction = "edit_unit";

    test("should create a unit when authorized", async () => {
      const { caller } = await setupTest();
      // Mock DB select for maxOrder and insert if needed
      // vi.spyOn(ctx.db, 'select')...
      // vi.spyOn(ctx.db, 'insert')...mockReturnValueOnce({ returning: vi.fn().mockResolvedValue([{ id: 'new_unit', courseId: 'course_abc', ... }]) });

      // Assuming createUnit validator requires these fields
      type Input = inferProcedureInput<AppRouter["units"]["create"]>;
      const input: Input = {
        courseId: "course_abc", // Required by permission middleware & validator
        name: "New Unit",
        description: "New Desc",
        // Add other fields required by createUnit validator
      };

      await expect(caller.units.create(input)).resolves.toBeUndefined();

      expect(userHasPermission).toHaveBeenCalledWith({
        userId: mockUser.id,
        courseId: input.courseId,
        permission: permissionNeeded,
      });
      expect(vi.mocked(callInvalidate)).toHaveBeenCalledOnce();
      // Check insertLog
      // expect(vi.mocked(insertLog)).toHaveBeenCalledWith(expect.objectContaining({ userId: mockUser.id, action: 'CREATE_UNIT', courseId: 'course_abc' }));
    });

    test("should throw UNAUTHORIZED if user lacks permission", async () => {
      vi.mocked(userHasPermission).mockResolvedValue(false);
      const { caller } = await setupTest();

      type Input = inferProcedureInput<AppRouter["units"]["create"]>;
      const input: Input = {
        courseId: "course_abc",
        name: "New Unit",
        description: "New Desc",
      };

      await expect(caller.units.create(input)).rejects.toThrowError(
        /You do not have permission/,
      );
      expect(userHasPermission).toHaveBeenCalledOnce();
    });

    test("should throw BAD_REQUEST if input lacks courseId (caught by middleware)", async () => {
      const { caller } = await setupTest();
      // Input is invalid because courseId is missing for the permission middleware
      const invalidInput = {
        name: "New Unit",
        description: "New Desc",
      };

      await expect(
        //@ts-expect-error - Input is invalid
        caller.units.create(invalidInput),
      ).rejects.toThrowError(/Input validation failed: requires 'courseId'/);
      expect(userHasPermission).not.toHaveBeenCalled();
    });

    test("should throw Zod validation error if input is invalid (caught by procedure)", async () => {
      const { caller } = await setupTest(); // Has permission

      // Input is invalid according to the 'createUnit' Zod schema (e.g., missing name)
      const invalidInput = {
        courseId: "course_abc",
        // name: "Missing Name",
        description: "New Desc",
      };

      await expect(
        //@ts-expect-error - Input is invalid
        caller.units.create(invalidInput),
      ).rejects.toThrowError(/zodError/); // Or more specific Zod error check
      // Permission check might or might not run depending on tRPC version and middleware order details
      // expect(hasPermission).toHaveBeenCalledOnce(); // Or not.toHaveBeenCalled()
    });

    test("should handle error during unit creation (e.g., DB insert fails)", async () => {
      const { caller } = await setupTest();
      // Mock DB insert to return empty array
      // vi.spyOn(ctx.db, 'select')... // Mock maxOrder select
      // vi.spyOn(ctx.db, 'insert')...mockReturnValueOnce({ returning: vi.fn().mockResolvedValue([]) });

      type Input = inferProcedureInput<AppRouter["units"]["create"]>;
      const input: Input = {
        courseId: "course_abc",
        name: "Failed Unit",
        description: "",
      };

      await expect(caller.units.create(input)).rejects.toThrowError(
        /Failed to create unit/, // Check TRPCError code 'INTERNAL_SERVER_ERROR'
      );
      expect(userHasPermission).toHaveBeenCalledOnce(); // Permission check should pass
    });

    // Add UNAUTHORIZED test if needed (similar to update)
  });

  describe("getTableData (protected)", () => {
    test("should return table data when logged in", async () => {
      const { caller } = await setupTest();
      // Mock DB select if needed
      // vi.spyOn(ctx.db, 'select')...

      type Input = inferProcedureInput<AppRouter["units"]["getTableData"]>;
      const input: Input = { courseId: "course_abc" };
      const result = await caller.units.getTableData(input);

      expect(result).toBeInstanceOf(Array);
      // Add more specific assertions
    });

    test("should throw UNAUTHORIZED if not logged in", async () => {
      const { caller } = await setupTest(null);
      type Input = inferProcedureInput<AppRouter["units"]["getTableData"]>;
      const input: Input = { courseId: "course_abc" };

      await expect(caller.units.getTableData(input)).rejects.toThrowError(
        /UNAUTHORIZED/,
      );
    });
  });
});
