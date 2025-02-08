CREATE TABLE "images" (
	"id" bigint PRIMARY KEY NOT NULL,
	"path" varchar(255) NOT NULL,
	CONSTRAINT "images_path_unique" UNIQUE("path")
);
