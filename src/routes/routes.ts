import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routesHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "THIs is root route" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("404 not found");
  }
};
