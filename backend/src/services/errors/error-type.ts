export const errorType = Object.freeze({
	DUPLICATED: "DUPLICATED",
	NOT_FOUND: "NOT_FOUND",
	VALIDATION: "VALIDATION",
} as const);

export type ErrorType = keyof typeof errorType;
