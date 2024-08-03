CREATE TABLE IF NOT EXISTS "accesses" (
	"id" integer PRIMARY KEY NOT NULL,
	"login" varchar(128) NOT NULL,
	"password" varchar(64) NOT NULL,
	"refresh_tokens" json NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "accesses_login_unique" UNIQUE("login"),
	CONSTRAINT "accesses_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"username" varchar(128) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accesses" ADD CONSTRAINT "accesses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
