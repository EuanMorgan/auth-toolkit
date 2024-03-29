import { Suspense } from "react";
import { LoginForm } from "~/components/auth/login-form";

const LoginPage = () => {
  /* We need to wrap the form in a suspense boundary so we can use the useSearchParams hook
  without opting the route into client side rendering */
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
