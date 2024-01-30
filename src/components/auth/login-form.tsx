import CardWrapper from '~/components/auth/card-wrapper';

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel='Welcome back!'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial={true}
    >
      <h1>Login form</h1>
    </CardWrapper>
  );
};

export default LoginForm;
