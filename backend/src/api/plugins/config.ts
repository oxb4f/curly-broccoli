import { Elysia } from "elysia";
import { load } from "../../infra/config";

export const configPlugin = new Elysia({ name: "configPlugin" }).derive(
	{ as: "global" },
	() => {
		return {
			config: load(),
		};
	},
);
