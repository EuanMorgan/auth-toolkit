"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { resetPassword } from "~/actions/reset-password";

import CardWrapper from "~/components/auth/card-wrapper";
import FormError from "~/components/form-error";
import FormSuccess from "~/components/form-success";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ResetSchema } from "~/schemas";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const [formSuccessMessage, setFormSuccessMessage] = useState<
    string | undefined
  >("");
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(
    "",
  );
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setFormErrorMessage("");
    setFormSuccessMessage("");

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          setFormErrorMessage(data?.error);
          setFormSuccessMessage(data?.success);
        })
        .catch(() => {
          setFormErrorMessage("Something went wrong");
          setFormSuccessMessage("");
        });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={formSuccessMessage} />
          <FormError message={formErrorMessage} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
