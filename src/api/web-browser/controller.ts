import type { Request, RequestHandler, Response } from "express";
import { logger } from "@/common/middleware/appLogger";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class WebBrowserController {
  private readonly logger = logger.child({ module: "WebBrowserController" });

  public openWebBrowser: RequestHandler = async (_req: Request, res: Response) => {
    this.logger.info("Opening web browser");
    return handleServiceResponse(ServiceResponse.success<{ status: boolean }>("Success", { status: true }), res);
  };
}

export const webBrowserController = new WebBrowserController();
