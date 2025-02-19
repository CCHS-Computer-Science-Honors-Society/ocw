"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

const lessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  contentType: z.enum(["google_docs", "notion", "quizlet", "tiptap"]),
  unitId: z.string().min(1, "Unit ID is required"),
  embedUrl: z.string().url("Invalid URL").optional(),
});

type LessonFormData = z.infer<typeof lessonSchema>;

type Unit = {
  id: string;
  name: string;
};

type CreateLessonFormProps = {
  units: Unit[];
  position: number;
};

export function CreateLessonForm({ units }: CreateLessonFormProps) {
  const [open, setOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  const { id } = useParams();
  const courseId = id as string;
  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      contentType: "tiptap",
    },
  });

  const { mutate: createLesson } = api.lesson.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = async (data: LessonFormData) => {
    // Here you would typically send the data to your API
    console.log(data);

    // Process the embedUrl based on contentType
    let content = {};
    if (data.contentType !== "tiptap" && data.embedUrl) {
      switch (data.contentType) {
        case "notion":
          // Extract Notion page ID from URL
          const notionMatch = /([a-f0-9]{32})/.exec(data.embedUrl);
          if (notionMatch) {
            content = { embedId: notionMatch[1] };
          }
          break;
        case "google_docs":
        case "quizlet":
          content = { embedUrl: data.embedUrl };
          break;
      }
    }

    // Prepare the final data to be sent to the API
    const lessonData = {
      ...data,
      courseId,
      content,
    };
    createLesson(lessonData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Lesson</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Lesson title" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Lesson description" {...field} />
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
                  <FormLabel>Content Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tiptap">TipTap</SelectItem>
                      <SelectItem value="notion">Notion</SelectItem>
                      <SelectItem value="google_docs">Google Docs</SelectItem>
                      <SelectItem value="quizlet">Quizlet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("contentType") !== "tiptap" && (
              <FormField
                control={form.control}
                name="embedUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embed URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription>
                      {form.watch("contentType") === "notion"
                        ? "Enter the Notion page URL"
                        : "Enter the full embed URL"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="unitId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Unit</FormLabel>
                  <Popover open={unitOpen} onOpenChange={setUnitOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={unitOpen}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? units.find((unit) => unit.id === field.value)
                                ?.name
                            : "Select unit"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search unit..." />
                        <CommandEmpty>No unit found.</CommandEmpty>
                        <CommandGroup>
                          {units.map((unit) => (
                            <CommandItem
                              value={unit.name}
                              key={unit.id}
                              onSelect={() => {
                                form.setValue("unitId", unit.id);
                                setUnitOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  unit.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {unit.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Lesson</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
