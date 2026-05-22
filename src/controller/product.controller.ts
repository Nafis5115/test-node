import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import { parseBody } from "../utils/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const products = readProduct();
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "THIs is Productss route",
        products: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const product: { id: number; name: string; price: number } = products.find(
      (product: { id: number; name: string; price: number }) =>
        product.id === id,
    );

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "THIs is single product route",
        product,
      }),
    );
  } else if (url === "/products" && method === "POST") {
    let body = await parseBody(req);
    console.log(body);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Successfully created a product",
        body,
      }),
    );
  } else {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("404 not found");
  }
};
