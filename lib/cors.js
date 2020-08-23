import Cors from "cors";
import initMiddleware from "./init-middleware";

/**
 * @see https://github.com/expressjs/cors#configuration-options
 */
const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

export default cors;
