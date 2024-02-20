"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import Header from "~/components/auth/header";
import Social from "~/components/auth/social";
import { BackButton } from "~/components/auth/back-button";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[450px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
