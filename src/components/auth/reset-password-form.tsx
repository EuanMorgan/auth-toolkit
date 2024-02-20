"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
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
import { NewPasswordSchema } from "~/schemas";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const [formSuccessMessage, setFormSuccessMessage] = useState<
    string | undefined
  >("");
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(
    "",
  );
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setFormErrorMessage("");
    setFormSuccessMessage("");

    startTransition(() => {
      resetPassword(values, token)
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
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
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
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
