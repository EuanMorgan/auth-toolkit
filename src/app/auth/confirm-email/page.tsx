import { Suspense } from "react";
import ConfirmEmailForm from "~/components/auth/confirm-email-form";

const ConfirmEmailPage = () => {
  /* We need to wrap the form in a suspense boundary so we can use the useSearchParams hook
  without opting the route into client side rendering */
  return (
    <Suspense>
      <ConfirmEmailForm />
    </Suspense>
  );
};

export default ConfirmEmailPage;
