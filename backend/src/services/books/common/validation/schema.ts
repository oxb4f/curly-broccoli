import { z } from "zod";

export const title = z.string().trim().min(1).max(255).readonly();

export const description = z.string().trim().min(1).max(1000).readonly();

export const author = z.string().trim().min(1).max(255).readonly();

export const genre = z.string().trim().min(1).max(255).readonly();

export const numberOfPages = z.coerce
	.number()
	.int()
	.min(0)
	.max(100_000)
	.readonly();

const isbn10or13 =
	/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

export const isbn = z.string().trim().min(1).nullable().refine(
	(value) => {
		if (!value) {
			return true;
		}

		if (!isbn10or13.test(value)) {
			return false;
		}

		const chars = value.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
		const last = chars.pop();

		if (!last) {
			return false;
		}

		let sum = 0;
		let check: number | string;

		if (chars.length === 9) {
			chars.reverse();

			for (let i = 0; i < chars.length; i++) {
				const char = chars[i];
				if (char) {
					sum += (i + 2) * Number.parseInt(char, 10);
				}
			}

			check = 11 - (sum % 11);

			if (check === 10) {
				check = "X";
			} else if (check === 11) {
				check = "0";
			}
		} else {
			for (let i = 0; i < chars.length; i++) {
				const char = chars[i];

				if (char) {
					sum += ((i % 2) * 2 + 1) * Number.parseInt(char, 10);
				}
			}

			check = 10 - (sum % 10);

			if (check === 10) {
				check = "0";
			}
		}

		return String(check) === last;
	},
	{
		message: "Invalid ISBN",
	},
);
