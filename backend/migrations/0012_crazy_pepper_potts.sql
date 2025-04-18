ALTER TABLE "reading_records" ALTER COLUMN "reading_tracker_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reading_trackers" ALTER COLUMN "state" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "state_user_book_idx" ON "reading_trackers" USING btree ("state","user_book_id");