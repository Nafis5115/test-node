import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routesHandler } from "./routes/routes";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    routesHandler(req, res);
  },
);

server.listen(5001, () => {
  console.log("Server Running On the PORT 5001");
});
