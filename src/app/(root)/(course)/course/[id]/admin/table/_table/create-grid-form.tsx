"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/trpc/react'
import { createId } from '@paralleldrive/cuid2'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Unit } from './types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
type UnitForm = Omit<Unit, 'id' | "courseId">

export const CreateUnitForm = (props: {
  options: {
    label: string,
    value: string
  }[]
  isCreating: () => void;
  id: string
}) => {
  const { isCreating, options, id } = props

  const utils = api.useUtils()

  const form = useForm<UnitForm>({
  })

  // Create mutation
  const { mutate: createUnit } = api.units.create.useMutation({
    onError(error) {
      toast.error(
        error.message ?? "An error occurred while creating the unit."
      );
    },
    async onMutate(newData) {
      await utils.units.getTableData.cancel();
      const prevData = utils.units.getTableData.getData({ courseId: id });

      // Create a new unit with a proper ID
      const newId = newData.id || createId();

      // Optimistically update the UI
      utils.units.getTableData.setData({ courseId: id }, (oldData) => {
        if (!oldData) return [{
          id: newId,
          name: newData.name,
          isPublished: newData.isPublished ?? false,
          courseId: id,
        }];

        return [...oldData, {
          id: newId,
          name: newData.name,
          isPublished: newData.isPublished ?? false,
          courseId: id,
        }];
      });

      return { prevData };
    },
    onSuccess() {
      // No need to handle success specially - just invalidate the query
    },
    onSettled() {
      void isCreating()
      void utils.units.getTableData.invalidate();
    },
  });




  return (
    <TableRow>
      <Form {...form}>
        <form>

          <TableCell >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell >
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="select a value" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>

                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
        </form>
      </Form>
    </TableRow>

  )
}
