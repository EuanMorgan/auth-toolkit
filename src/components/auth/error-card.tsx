import { BackButton } from "~/components/auth/back-button";
import CardWrapper from "~/components/auth/card-wrapper";
import Header from "~/components/auth/header";
import { Card, CardFooter, CardHeader } from "~/components/ui/card";
import { AlertTriangle } from "lucide-react";
const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <AlertTriangle className="mx-auto text-destructive" />
    </CardWrapper>
  );
};

export default ErrorCard;
