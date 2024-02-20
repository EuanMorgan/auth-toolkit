CREATE TABLE IF NOT EXISTS "passwordResetToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "passwordResetToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
