"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the schema using Zod
const schema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  isPublished: z.boolean(),
  description: z.string().max(1000, "Description is too long"),
});

export type FormData = z.infer<typeof schema>;

interface FormContextProps {
  children: React.ReactNode;
  data: FormData & { id: string };
  courseId: string;
}

export const FormContext: React.FC<FormContextProps> = ({
  children,
  data,
  courseId,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      description: data.description,
      isPublished: data.isPublished,
    },
    mode: "onChange", // To track form state more effectively
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-row justify-between">
            <h2 className="text-4xl font-semibold">Unit: {data.name}</h2>
            <SubmitButton isLoading={isLoading} />
          </div>
          {children}
        </div>
      </form>
    </FormProvider>
  );
};

// Input component for "name" field
export const UpdateUnitName: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  return (
    <div>
      <Input placeholder="Unit Name" {...register("name")} />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}
    </div>
  );
};

// Textarea component for "description" field
export const UpdateUnitDescription: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  return (
    <div>
      <Textarea placeholder="Description" {...register("description")} />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
};

// Switch component for "isPublished" field
export const UpdateUnitPublishStatus: React.FC = () => {
  const { register, getValues } = useFormContext<FormData>();
  const { isPublished } = getValues();
  return (
    <div className="flex items-center">
      <label htmlFor="isPublished" className="mr-2">
        Published:
      </label>
      <Switch
        id="isPublished"
        {...register("isPublished")}
        defaultChecked={isPublished}
      />
    </div>
  );
};

// Submit button component
interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  const { formState } = useFormContext<FormData>();
  const { isDirty } = formState;

  return (
    <Button type="submit" disabled={!isDirty || isLoading}>
      {isLoading ? "Submitting..." : "Submit"}
    </Button>
  );
};
