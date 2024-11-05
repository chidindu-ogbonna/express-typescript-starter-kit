import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { webBrowserController } from "./controller";

export const webBrowserRegistry = new OpenAPIRegistry();
export const webBrowserRouter: Router = express.Router();

const WebBrowserRequestSchema = z.object({
  body: z.object({
    url: z.string().url(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

webBrowserRegistry.registerPath({
  method: "post",
  path: "/web-browser",
  tags: ["Web Browser"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: WebBrowserRequestSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.object({ success: z.boolean() }), "Success"),
});

webBrowserRouter.post("/", validateRequest(WebBrowserRequestSchema), webBrowserController.openWebBrowser);
