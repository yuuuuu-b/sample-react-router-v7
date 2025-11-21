CREATE TABLE "my_schema"."topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fileName" varchar(255) NOT NULL,
	"fileType" varchar(255) NOT NULL,
	"file" jsonb NOT NULL
);
