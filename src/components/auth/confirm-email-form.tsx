"use client";

import CardWrapper from "~/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { verifyEmail } from "~/actions/new-verification";
import FormError from "~/components/form-error";

const ConfirmEmailForm = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const [formErrorMessage, setFormErrorMessage] = useState<
    string | undefined
  >();
  const [formSuccessMessage, setFormSuccessMessage] = useState<
    string | undefined
  >();

  const onSubmit = useCallback(() => {
    if (formSuccessMessage ?? formErrorMessage) return; // Don't run if we already have a success or error message
    if (!token) return setFormErrorMessage("Invalid token");
    verifyEmail(token)
      .then((res) => {
        setFormSuccessMessage(res.success);
        setFormErrorMessage(res.error);
      })
      .catch(() => {
        setFormErrorMessage("Something went wrong");
        setFormSuccessMessage("");
      });
  }, [token, formSuccessMessage, formErrorMessage]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirm Email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        {!formSuccessMessage && !formErrorMessage && <BeatLoader />}
        <FormError message={formErrorMessage} />
        <FormError message={formSuccessMessage} />
      </div>
    </CardWrapper>
  );
};

export default ConfirmEmailForm;
