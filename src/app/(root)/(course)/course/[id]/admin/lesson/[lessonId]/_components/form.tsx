"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { createLessonFormSchema } from "@/validators/lesson";
import type { z } from "zod";
import { useTRPC } from "@/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentTypeEnum } from "@/server/db/schema";
// Define the form schema type
type CreateLessonFormValues = z.infer<typeof createLessonFormSchema>;

export function CreateLessonForm({
  courseId,
  units = [], // Provide a default empty array
}: {
  courseId: string;
  units: {
    label: string;
    value: string;
  }[];
}) {
  console.log("Units received in component:", units);
  const api = useTRPC();
  const queryClient = useQueryClient();
  const qKey = api.units.getUnitsForDashboard.queryKey();
  const { mutate, isPending: isLoading } = useMutation(
    api.lesson.create.mutationOptions({
      onSuccess: () => {
        toast.success("Lesson updated successfully!");
        void queryClient.invalidateQueries({
          queryKey: qKey,
        });
      },
      onError: (error) => {
        toast.error(
          error.message ?? "An error occurred while updating the lesson.",
        );
      },
    }),
  );
  // Check if the device is mobile
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  // Initialize the form with default values
  const form = useForm<CreateLessonFormValues>({
    resolver: zodResolver(createLessonFormSchema),
    defaultValues: {
      name: "",
      isPublished: false,
      pureLink: false,
      unitId: "",
      contentType: "quizlet",
      embed: {
        password: "",
        embedUrl: "",
      },
    },
  });

  function handleSubmit(values: CreateLessonFormValues) {
    mutate({ ...values, courseId });
    setOpen(false);
    form.reset();
  }
  // At the beginning of your component
  if (!units || !Array.isArray(units)) {
    return <div>No Units Available</div>;
  }

  // Form content that will be used in both Dialog and Drawer
  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Lesson Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter lesson name"
                  {...field}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select a content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      {ContentTypeEnum.map((type) => (
                        <SelectItem value={type} key={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Unit</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? units.find((unit) => unit.value === field.value)
                            ?.label
                        : "Select unit"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search unit..." />
                    <CommandList>
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandGroup>
                        {units.map((unit) => (
                          <CommandItem
                            value={unit.label} // Add this line
                            key={unit.value}
                            onSelect={() => {
                              form.setValue("unitId", unit.value);
                            }}
                          >
                            {unit.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                unit.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base font-semibold">
                    Publish Lesson
                  </FormLabel>
                  <FormDescription>
                    Make this lesson available to students
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pureLink"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base font-semibold">
                    Pure Link
                  </FormLabel>
                  <FormDescription>
                    Use a direct link instead of embedded content
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-md border p-4">
          <h3 className="text-base font-semibold">Embed Settings</h3>
          <FormField
            control={form.control}
            name="embed.embedUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Embed URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter embed URL (email format)"
                    {...field}
                    value={field.value ?? ""}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="embed.password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password for embed"
                    {...field}
                    value={field.value ?? ""}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!isMobile && (
          <DialogFooter>
            <LoadingButton
              loading={isLoading}
              type="submit"
              className="w-full sm:w-auto"
            >
              Create Lesson
            </LoadingButton>
          </DialogFooter>
        )}

        {isMobile && (
          <DrawerFooter>
            <LoadingButton type="submit" className="w-full">
              Create Lesson
            </LoadingButton>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </form>
    </Form>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="default" className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Lesson
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4">
            <DrawerHeader className="text-left">
              <DrawerTitle>Create New Lesson</DrawerTitle>
              <DrawerDescription>
                Add a new lesson to your course. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">{FormContent()}</div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>
                Add a new lesson to your course. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {FormContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
