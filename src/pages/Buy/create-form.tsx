import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { notify } from "@/store/event-broker";
import { v4 } from "uuid";
import { CardHeader } from "@/components/card-header";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productName: z.string().min(2, {
    message: "Add a product",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ProfileForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      productName: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res: FormValues = await new Promise((res) =>
      setTimeout(() => res(data), 1000)
    );
    notify("PRODUCT_PROCESSED", JSON.stringify({ id: v4(), ...res }));
  });

  return (
    <Form {...form}>
      <CardHeader title="Payment service" />
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Buy {form.watch("productName")}
        </Button>
      </form>
    </Form>
  );
}
