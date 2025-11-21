CREATE SCHEMA "my_schema";
--> statement-breakpoint
CREATE TYPE "my_schema"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "my_schema"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "my_schema"."role" DEFAULT 'USER' NOT NULL
);
