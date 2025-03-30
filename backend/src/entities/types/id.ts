import type { Optional } from "./optional";

type ToOptional<T> = Optional<T>;

export type Id = number;
export type MaybeNumberId = ToOptional<Id>;
