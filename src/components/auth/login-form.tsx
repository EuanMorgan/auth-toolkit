"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "~/actions/login";
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
import { LoginSchema } from "~/schemas";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with a different provider."
      : searchParams.get("error")
      ? "Something went wrong. Please try again."
      : "";

  const [isPending, startTransition] = useTransition();

  const [formSuccessMessage, setFormSuccessMessage] = useState<
    string | undefined
  >("");
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(
    ""
  );
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFormErrorMessage("");
    setFormSuccessMessage("");

    startTransition(() => {
      login(values).then(data => {
        setFormErrorMessage(data?.error);
        setFormSuccessMessage(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={true}
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
          <FormError message={formErrorMessage || urlError} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
