import assert from "node:assert/strict";
import Elysia, { t } from "elysia";
import createBookService from "../../services/books/create/action";
import deleteUserBookService from "../../services/books/private/delete/action";
import getUserBookService from "../../services/books/private/get/action";
import listUserBooksService from "../../services/books/private/list/action";
import updateUserBookService from "../../services/books/private/update/action";
import addBookService from "../../services/books/public/add/action";
import getBookService from "../../services/books/public/get/action";
import listBooksService from "../../services/books/public/list/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";

export const booksRoute = new Elysia({ name: "booksRoute" })
	.use(contextPlugin)
	.decorate("createBookService", createBookService)
	.decorate("listBooksService", listBooksService)
	.decorate("getBookService", getBookService)
	.decorate("listUserBooksService", listUserBooksService)
	.decorate("getUserBookService", getUserBookService)
	.decorate("updateUserBookService", updateUserBookService)
	.decorate("deleteUserBookService", deleteUserBookService)
	.decorate("addBookService", addBookService)
	.group("/books", (app) =>
		app.guard((app) =>
			app
				.use(createJwtAuthGuard())
				.post(
					"/",
					async ({ body, context, createBookService, store }) => {
						assert(store.jwtAuthGuardPayload.payload?.accessId);

						const result = await createBookService({
							dto: {
								accessId: store.jwtAuthGuardPayload.payload.accessId,
								...body,
							},
							context,
						});

						return result;
					},
					{
						tags: ["Books"],
						body: t.Object({
							title: t.String({
								description: "Title",
							}),
							author: t.String({
								description: "Author",
							}),
							numberOfPages: t.Number({
								description: "Number of pages",
							}),
							description: t.String({
								description: "Description",
							}),
							genre: t.String({
								description: "Genre",
							}),
							isbn: t.String({
								description: "ISBN",
							}),
							imageUrl: t.String({
								description: "Image URL",
							}),
						}),
					},
				)
				.group("/public", (app) =>
					app
						.post(
							"/add/:bookId",
							async ({ params, context, addBookService, store }) => {
								assert(store.jwtAuthGuardPayload.payload?.accessId);

								const result = await addBookService({
									dto: {
										accessId: store.jwtAuthGuardPayload.payload.accessId,
										bookId: params.bookId,
									},
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								params: t.Object({
									bookId: t.Number({
										description: "Book ID",
									}),
								}),
							},
						)
						.get(
							"/",
							async ({ query, context, listBooksService }) => {
								const result = await listBooksService({
									dto: query as any,
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								query: t.Object({
									orderDirection: t.Optional(
										t.Nullable(
											t.Enum({
												asc: "asc",
												desc: "desc",
											}),
										),
									),
									orderField: t.Optional(
										t.Nullable(
											t.String({
												description: "Order field",
											}),
										),
									),
									limit: t.Optional(
										t.Nullable(
											t.Number({
												description: "Limit",
												default: 10,
											}),
										),
									),
									offset: t.Optional(
										t.Nullable(
											t.Number({
												description: "Offset",
												default: 0,
											}),
										),
									),
								}),
							},
						)
						.get(
							"/:id",
							async ({ params, context, getBookService }) => {
								const result = await getBookService({
									dto: {
										bookId: params.id,
									},
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								params: t.Object({
									id: t.Number({
										description: "Book ID",
									}),
								}),
							},
						),
				)
				.group("/private", (app) =>
					app
						.get(
							"/",
							async ({ query, context, listUserBooksService, store }) => {
								assert(store.jwtAuthGuardPayload.payload?.accessId);

								const result = await listUserBooksService({
									dto: {
										accessId: store.jwtAuthGuardPayload.payload.accessId,
										...query,
									} as any,
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								query: t.Object({
									orderDirection: t.Optional(
										t.Nullable(
											t.Enum(
												{
													asc: "asc",
													desc: "desc",
												},
												{ description: "Order direction" },
											),
										),
									),
									orderField: t.Optional(
										t.Nullable(
											t.String({
												description: "Order field",
											}),
										),
									),
									limit: t.Optional(
										t.Nullable(
											t.Number({
												description: "Limit",
												default: 10,
											}),
										),
									),
									offset: t.Optional(
										t.Nullable(
											t.Number({
												description: "Offset",
												default: 0,
											}),
										),
									),
								}),
							},
						)
						.get(
							"/:id",
							async ({ params, context, getUserBookService, store }) => {
								assert(store.jwtAuthGuardPayload.payload?.accessId);

								const result = await getUserBookService({
									dto: {
										bookId: params.id,
									},
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								params: t.Object({
									id: t.Number({
										description: "Book ID",
									}),
								}),
							},
						)
						.patch(
							"/:id",
							async ({
								params,
								body,
								context,
								updateUserBookService,
								store,
							}) => {
								assert(store.jwtAuthGuardPayload.payload?.accessId);

								const result = await updateUserBookService({
									dto: {
										accessId: store.jwtAuthGuardPayload.payload.accessId,
										bookId: params.id,
										...body,
									},
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								params: t.Object({
									id: t.Number({
										description: "Book ID",
									}),
								}),
								body: t.Object({
									title: t.Optional(
										t.String({
											description: "Title",
										}),
									),
									description: t.Optional(
										t.Nullable(
											t.String({
												description: "Description",
											}),
										),
									),
									author: t.Optional(
										t.String({
											description: "Author",
										}),
									),
									genre: t.Optional(
										t.Nullable(
											t.String({
												description: "Genre",
											}),
										),
									),
									imageUrl: t.Optional(
										t.Nullable(
											t.String({
												description: "Image URL",
											}),
										),
									),
									numberOfPages: t.Optional(
										t.Number({
											description: "Number of pages",
										}),
									),
									isbn: t.Optional(
										t.Nullable(
											t.String({
												description: "ISBN",
											}),
										),
									),
									isFavorite: t.Optional(
										t.Boolean({
											description: "Is favorite",
										}),
									),
									isRead: t.Optional(
										t.Boolean({
											description: "Is read",
										}),
									),
									rating: t.Optional(
										t.Nullable(
											t.Number({
												description: "Rating",
											}),
										),
									),
									review: t.Optional(
										t.Nullable(
											t.String({
												description: "Review",
											}),
										),
									),
								}),
							},
						)
						.delete(
							"/:id",
							async ({ params, context, deleteUserBookService, store }) => {
								assert(store.jwtAuthGuardPayload.payload?.accessId);

								const result = await deleteUserBookService({
									dto: {
										accessId: store.jwtAuthGuardPayload.payload.accessId,
										bookId: params.id,
									},
									context,
								});

								return result;
							},
							{
								tags: ["Books"],
								params: t.Object({
									id: t.Number({
										description: "Book ID",
									}),
								}),
							},
						),
				),
		),
	);
