import type { Config } from "../infra/config";
import type { AccessesRepository } from "./accesses/repository";
import type { UsersRepository } from "./users/repository";

export interface Context {
	config: Config;
	usersRepository: UsersRepository;
	accessesRepository: AccessesRepository;
}
