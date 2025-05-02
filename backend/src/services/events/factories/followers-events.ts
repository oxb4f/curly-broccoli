import type { BaseEvent } from "../../../entities/events/base";
import type { Id } from "../../../entities/types/id";
import type { Context } from "../../context";
import type { ListFollowerDto } from "../../followers/repository";

export type EventGeneratorFn = (dto: ListFollowerDto["data"][0]) => BaseEvent;

export async function followersEventsFactory({
	userId,
	context,
	eventGeneratorFn,
}: {
	userId: Id;
	context: Context;
	eventGeneratorFn: EventGeneratorFn;
}) {
	const followers = await context.followersRepository.list({
		userId,
	});

	for (const follower of followers.data) {
		const event = eventGeneratorFn(follower);

		await context.eventDispatcher.dispatch(event);
	}
}
