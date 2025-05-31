import queryString from "node:querystring";
import { Elysia } from "elysia";
import { onError } from "./hooks/on-error";
import { configPlugin } from "./plugins/config";
import { contextPlugin } from "./plugins/context";
import { accessesRoute } from "./routes/accesses";
import { booksRoute } from "./routes/books";
import { eventsRoute } from "./routes/events";
import { followersRoute } from "./routes/followers";
import { imagesRoute } from "./routes/images";
import { pingRoute } from "./routes/ping";
import { readingTrackersRoute } from "./routes/readingTrackers";
import { referencesRoute } from "./routes/references";
import { usersRoute } from "./routes/users";

export const app = new Elysia()
	.onTransform((ctx) => {
		ctx.query = queryString.parse(
			new URL(ctx.request.url).search.slice(1),
		) as Record<string, string | string[] | undefined>;
	})
	.onError(({ error, set }) => {
		return onError(error as Error, set);
	})
	.use(configPlugin)
	.use(contextPlugin)
	.use(pingRoute)
	.use(usersRoute)
	.use(accessesRoute)
	.use(imagesRoute)
	.use(booksRoute)
	.use(readingTrackersRoute)
	.use(followersRoute)
	.use(eventsRoute)
	.use(referencesRoute)
	.listen({ port: process.env.APP_PORT }, () =>
		console.log(`🦊 Elysia is running at :${process.env.APP_PORT}`),
	);
