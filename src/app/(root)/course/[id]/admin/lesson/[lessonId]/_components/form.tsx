"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";

const formSchema = z.object({
  name: z.string(),
  isPublished: z.boolean(),
  embedId: z.string().optional(),
  contentType: z.enum(["tiptap", "quizlet", "notion", "google_docs"]),
});
type FormSchema = z.infer<typeof formSchema>;

export function UpdateLesson({
  defaultValues,
}: {
  defaultValues: FormSchema & { id: string };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues.name,
      isPublished: defaultValues.isPublished,
      embedId: defaultValues.embedId,
      contentType: defaultValues.contentType,
    },
  });

  const { mutate: updateLesson, isPending: isLoading } =
    api.lesson.update.useMutation({
      onSuccess: () => {
        toast.success("Lesson updated successfully!");
      },
      onError: (error) => {
        toast.error(
          error.message ?? "An error occurred while updating the lesson.",
        );
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateLesson({
      id: defaultValues.id,
      title: values.name,
      isPublished: values.isPublished,
      embedId: values.embedId,
      contentType: values.contentType,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-screen flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name Here" type="" {...field} />
              </FormControl>
              <FormDescription>
                This is the publicly display name for the lesson
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Published</FormLabel>
                <FormDescription>
                  Is this course publicly available?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked={defaultValues.isPublished}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="embedId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Embed Url</FormLabel>
              <FormControl>
                <Input placeholder="https://test.com/test" type="" {...field} />
              </FormControl>
              <FormDescription>
                This is the Embed URL of the content you want to display
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="quizlet">Quizlet </SelectItem>
                  <SelectItem value="google_docs">Google Docs</SelectItem>
                  <SelectItem value="tiptap">Edtior</SelectItem>
                  <SelectItem value="notion">Notion</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                What is the type of content that is being displayed here?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
