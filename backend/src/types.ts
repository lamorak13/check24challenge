import { IncomingHttpHeaders } from "http";
import { Request } from "express";

interface CustomRequest extends Request {
  headers: IncomingHttpHeaders & {
    "x-user-name"?: string;
  };
}

export { CustomRequest };
