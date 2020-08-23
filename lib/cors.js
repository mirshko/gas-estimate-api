import Cors from "cors";
import initMiddleware from "./init-middleware";

/**
 * @see https://github.com/expressjs/cors#configuration-options
 */
const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "OPTIONS"],
  })
);

export default cors;
