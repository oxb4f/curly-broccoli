import assert from "node:assert/strict";
import Elysia, { type InferContext } from "elysia";
import createBookService from "../../services/books/create/action";
import deleteUserBookService from "../../services/books/private/delete/action";
import getUserBookService from "../../services/books/private/get/action";
import listUserBooksService from "../../services/books/private/list/action";
import updateUserBookService from "../../services/books/private/update/action";
import addBookService from "../../services/books/public/add/action";
import getBookService from "../../services/books/public/get/action";
import listBooksService from "../../services/books/public/list/action";
import quickSearchBookService from "../../services/books/public/search/quick/action";
import { createJwtAuthGuard } from "../guards/jwt-auth";
import { contextPlugin } from "../plugins/context";
import { ensureRequestContext } from "../utils/ensure-request-context";
import { prepareServiceHandlerPayload } from "./utils";

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
	.decorate("quickSearchBookService", quickSearchBookService)
	.group("/books", (app) =>
		app.guard((app) => {
			app.get(
				"/quick-search",
				...ensureRequestContext<InferContext<typeof app>, any>(
					async (ctx) => {
						return ctx.quickSearchBookService({
							dto: {
								...prepareServiceHandlerPayload(ctx),
							},
							context: ctx.context,
						});
					},
				),
			);

			const appWithJwtGuard = app.use(createJwtAuthGuard());

			appWithJwtGuard.post(
				"/",
				...ensureRequestContext<InferContext<typeof appWithJwtGuard>, any>(
					async (ctx) => {
						assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

						return ctx.createBookService({
							dto: {
								accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
								...prepareServiceHandlerPayload(ctx),
							},
							context: ctx.context,
						});
					},
				),
			);

			appWithJwtGuard.group("/public", (app) =>
				app
					.post(
						"/add/:bookId",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.addBookService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					)
					.get(
						"/",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.listBooksService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					)
					.get(
						"/:bookId",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.getBookService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					),
			);

			return appWithJwtGuard.group("/private", (app) =>
				app
					.get(
						"/",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.listUserBooksService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					)
					.get(
						"/:bookId",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.getUserBookService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					)
					.patch(
						"/:bookId",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.updateUserBookService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					)
					.delete(
						"/:bookId",
						...ensureRequestContext<InferContext<typeof app>, any>(
							async (ctx) => {
								assert(ctx.store.jwtAuthGuardPayload.payload?.accessId);

								return ctx.deleteUserBookService({
									dto: {
										accessId: ctx.store.jwtAuthGuardPayload.payload.accessId,
										...prepareServiceHandlerPayload(ctx),
									},
									context: ctx.context,
								});
							},
						),
					),
			);
		}),
	);
