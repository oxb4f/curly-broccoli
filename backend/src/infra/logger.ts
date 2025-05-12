import os from "node:os";
import process from "node:process";

import pino from "pino";
import { getScope } from "./als";

export type FactoryOptions = {
	name: string;
	contextMixin?: () => Record<string, unknown>;
};

export function loggerFactory(options: FactoryOptions) {
	const defaultMixin = () => {
		const scope = getScope();

		return scope ? { ctxId: scope.ctxId } : {};
	};

	return pino({
		name: options.name,
		level: "info",
		messageKey: "message",
		base: {
			service: "api",
			pid: process.pid,
			hostname: os.hostname(),
		},
		timestamp: pino.stdTimeFunctions.isoTime,
		formatters: {
			level(label) {
				return { severity: label };
			},
		},
		mixin: options.contextMixin ?? defaultMixin,
	});
}

export const defaultServiceLogger = loggerFactory({ name: "service-logger" });
export const defaultRequestLoggerFactory = (ctxId: string) =>
	loggerFactory({ name: "request-logger", contextMixin: () => ({ ctxId }) });
