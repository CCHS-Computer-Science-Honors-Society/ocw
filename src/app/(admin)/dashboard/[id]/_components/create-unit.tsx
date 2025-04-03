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
import { useTRPC } from "@/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { PlusIcon } from "lucide-react";
import { type CreateUnitForm, createUnitForm } from "@/validators/unit";
import { useQueryClient } from "@tanstack/react-query";

export function CreateUnitForm({ courseId }: { courseId: string }) {
  const api = useTRPC();
  const queryOption = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation(
    api.units.create.mutationOptions({
      onSuccess: () => {
        toast.success("Lesson updated successfully!");
        const qKey = api.units.getTableData.queryKey();

        void queryOption.invalidateQueries({
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
  const form = useForm<CreateUnitForm>({
    resolver: zodResolver(createUnitForm),
    defaultValues: {},
  });

  function handleSubmit(values: CreateUnitForm) {
    mutate({
      ...values,
      courseId,
    });
    setOpen(false);
    form.reset();
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
              Add Unit
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4">
            <DrawerHeader className="text-left">
              <DrawerTitle>Create New Unit</DrawerTitle>
              <DrawerDescription>
                Add a new unit to your course. Click save when you&apos;re done.
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
              Add Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Unit</DialogTitle>
              <DialogDescription>
                Add a new unit to your course. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            {FormContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
