import { AlertTriangle } from "lucide-react";
import CardWrapper from "~/components/auth/card-wrapper";
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
