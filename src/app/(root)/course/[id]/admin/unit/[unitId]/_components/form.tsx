"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { LoadingButton } from "@/components/ui/loading-button";

const schema = z.object({
  name: z.string().min(1).max(60),
  description: z.string().min(2).max(255),
  isPublic: z.boolean(),
});

export type FormData = z.infer<typeof schema>;

interface FormContextProps {
  courseId: string;
  unitId: string;
}

export function LessonForm({ courseId, unitId }: FormContextProps) {
  const [data] = api.units.getMinimalUnit.useSuspenseQuery({
    unitId,
  });
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const utils = api.useUtils();

  const { mutate: update, isPending: isLoading } = api.units.update.useMutation(
    {
      onSuccess: () => {
        toast.success("Unit updated successfully!");
        void utils.units.invalidate();
        form.reset(form.getValues()); // Reset dirty state after successful update
      },
      onError: (error) => {
        toast.error(
          error.message || "An error occurred while updating the unit.",
        );
      },
    },
  );

  if (!data) return null;
  const onSubmit = (formData: FormData) => {
    update({
      courseId,
      data: {
        id: data.id,
        ...formData,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduction To Atoms"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>The name of the unit</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                briefly describe what is the unit
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Public</FormLabel>
                <FormDescription>
                  Is this unit available to the general public
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={isLoading}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
