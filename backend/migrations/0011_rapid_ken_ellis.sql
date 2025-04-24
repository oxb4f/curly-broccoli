CREATE TABLE "reading_records" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"reading_tracker_id" bigint,
	"duration" integer NOT NULL,
	"number_of_pages" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading_trackers" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp,
	"state" varchar(255),
	"user_book_id" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reading_records" ADD CONSTRAINT "reading_records_reading_tracker_id_reading_trackers_id_fk" FOREIGN KEY ("reading_tracker_id") REFERENCES "public"."reading_trackers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_trackers" ADD CONSTRAINT "reading_trackers_user_book_id_user_books_id_fk" FOREIGN KEY ("user_book_id") REFERENCES "public"."user_books"("id") ON DELETE no action ON UPDATE no action;