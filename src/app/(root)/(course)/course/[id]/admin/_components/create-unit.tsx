"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";

const formSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
});

// fix this propdrilling shit
function CreateUnit({
  courseId,
  callback,
}: {
  courseId: string;
  callback: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const utils = api.useUtils();

  const { mutate: createUnit } = api.lesson.createUnit.useMutation({
    onSuccess: () => {
      form.reset();
      void utils.units.invalidate();
      callback();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUnit({
      ...values,
      courseId,
    });
  }

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
                  placeholder="Functions and how they work"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>The name of he unit.</FormDescription>
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
                  placeholder="In the unit we will cover how to build a robot"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe what this unit will cover
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function CreateUnitPopup({ courseId }: { courseId: string }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"> Create Unit </Button>
      </DialogTrigger>
      <DialogContent>
        <CreateUnit callback={() => setOpen(false)} courseId={courseId} />
      </DialogContent>
    </Dialog>
  );
}
