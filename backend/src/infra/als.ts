import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

export type RequestScope = {
	ctxId: string;
	start: [number, number];
};

const als = new AsyncLocalStorage<RequestScope>();

export const getScope = () => als.getStore();
export const runInScope = <T>(fn: () => T, ctxId?: string) => {
	const scope: RequestScope = {
		ctxId: ctxId ?? randomUUID(),
		start: process.hrtime(),
	};

	return als.run(scope, fn);
};
