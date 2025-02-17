import type { Context } from "./context";
import type { Dto, DtoShape } from "./dtos/factory";

export type InputDto<T extends Record<string, any>> = Dto<T>;
export type OutputResult<T extends Record<string, any>> = DtoShape<Dto<T>>;

export type ServiceAction<
	InputType extends Record<string, any>,
	OutputType extends Record<string, any>,
> = (arg: {
	dto: InputType;
	context: Context;
}) => Promise<OutputType>;

function createServiceProxy<
	InputType extends Record<string, any>,
	OutputType extends Record<string, any>,
>(action: ServiceAction<InputType, OutputType>, dtoIn: InputDto<InputType>) {
	return new Proxy(action, {
		async apply(
			target: ServiceAction<InputType, OutputType>,
			thisArg: unknown,
			[arg]: [{ dto: InputType; context: Context }],
		) {
			arg.dto = await dtoIn.create(arg.dto);
			return target.call(thisArg, arg);
		},
	});
}

export function makeService<
	InputType extends Record<string, any>,
	OutputType extends Record<string, any>,
>(action: ServiceAction<InputType, OutputType>, dtoIn: InputDto<InputType>) {
	return createServiceProxy(action, dtoIn);
}
