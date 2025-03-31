import { type RowData } from "@tanstack/react-table";
import { type UnitOption } from "../../_table/lesson";

// --- Import types that are used within your custom meta properties ---
// Adjust the import path as necessary

// --- Augment the @tanstack/react-table module ---
declare module "@tanstack/react-table" {
  // Interface merging adds properties to the existing TableMeta
  // Make properties optional ('?') in the global augmentation
  // if they aren't truly applicable to *every* possible table.
  interface TableMeta<TData extends RowData> {
    // --- Properties specific to Lesson/Course context ---
    // These are now *potentially* available on any TableMeta instance.

    /**
     * Array of unit options, typically used for selection in course/lesson tables.
     * Optional in the base augmentation.
     */
    units?: UnitOption[];

    /**
     * The ID of the course context, relevant for course/lesson tables.
     * Optional in the base augmentation.
     */
    courseId?: string;

    /**
     * Function to trigger a mutation for updating a specific cell's data.
     * Optional in the base augmentation.
     * @param rowId The unique ID of the row being updated (typically string).
     * @param field The specific field within the row data (keyof TData) or a related entity (string) to update.
     * @param value The new value for the field.
     */
    updateCell?: (
      // Assuming row IDs are strings. Could be refined if TData always has a specific ID type:
      // rowId: TData extends { id: infer IDType } ? IDType : string,
      rowId: string,
      // Allows keys of the specific row data OR other string identifiers (like 'embedPassword')
      field: keyof TData | string,
      value: unknown, // Value type can vary greatly
    ) => void;

    /**
     * Function to check if a specific cell update is currently pending.
     * Optional in the base augmentation.
     * @param rowId The unique ID of the row.
     * @param field The specific field being checked.
     * @returns `true` if the update for this cell is pending, `false` otherwise.
     */
    getCellUpdatePending?: (rowId: string, field: string) => boolean;

    // --- Add other potential generic or optional meta properties ---
    // Example: A function to handle row deletion
    // deleteItem?: (rowId: string) => void;
  }
}

// --- Ensure your referenced types (UnitOption) are exported/available ---
// Example:
// export type UnitOption = {
//   label: string;
//   value: string;
// };

// You don't need to redefine DataItem here, as TableMeta uses the TData generic.
// The 'field' in updateCell uses `keyof TData` to refer to the specific data type
// of the table instance.
