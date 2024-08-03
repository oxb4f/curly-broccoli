import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { onError } from "./hooks/on-error";
import { configPlugin } from "./plugins/config";
import { contextPlugin } from "./plugins/context";
import { pingRoute } from "./routes/ping";
import { usersRoute } from "./routes/users";

export const app = new Elysia()
	.onError(({ error, set }) => {
		return onError(error, set);
	})
	.use(swagger())
	.use(configPlugin)
	.use(contextPlugin)
	.use(pingRoute)
	.use(usersRoute)
	.listen({ port: process.env.APP_PORT }, () =>
		console.log(`🦊 Elysia is running at :${process.env.APP_PORT}`),
	);
