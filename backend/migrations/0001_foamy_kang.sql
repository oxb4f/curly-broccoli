ALTER TABLE "accesses" DROP CONSTRAINT "accesses_login_unique";--> statement-breakpoint
ALTER TABLE "accesses" DROP CONSTRAINT "accesses_user_id_unique";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "login_user_idx" ON "accesses" USING btree ("login","user_id");