CREATE TABLE "followers" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" bigint NOT NULL,
	"follower_id" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_id_users_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_follower_idx" ON "followers" USING btree ("user_id","follower_id");