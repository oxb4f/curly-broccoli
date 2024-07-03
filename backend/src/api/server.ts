import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { pingRoute } from "./routes/ping";

export const app = new Elysia()
	.use(swagger())
	.use(pingRoute)
	.listen({ port: process.env.APP_PORT }, () =>
		console.log(`🦊 Elysia is running at :${process.env.APP_PORT}`),
	);
