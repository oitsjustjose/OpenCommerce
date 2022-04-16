import BuildApp from "./app";
import { LOGGER } from "./app/util/Logger";
import ConnectDb from "./db";

const app = BuildApp();
ConnectDb();

const port = process.env.PORT || 3000;
app.listen(port, () =>
  LOGGER.info(`Server started. Listening on port ${port}`)
);
