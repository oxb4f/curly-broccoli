CREATE TABLE "book_profiles" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"author" varchar(255) NOT NULL,
	"genre" varchar(255),
	"number_of_pages" integer NOT NULL,
	"isbn" varchar(255),
	"image_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"book_profile_id" bigint,
	"is_public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_books" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"book_id" bigint,
	"user_id" bigint,
	"book_profile_id" bigint,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"rating" integer,
	"review" text
);
--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_book_profile_id_book_profiles_id_fk" FOREIGN KEY ("book_profile_id") REFERENCES "public"."book_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_book_profile_id_book_profiles_id_fk" FOREIGN KEY ("book_profile_id") REFERENCES "public"."book_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "book_user_idx" ON "user_books" USING btree ("book_id","user_id");--> statement-breakpoint
CREATE INDEX "favorite_user_idx" ON "user_books" USING btree ("is_favorite","user_id");