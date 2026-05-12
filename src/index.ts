import express from "express";
import cors from "cors";
import "dotenv/config";

import assetRoutes from "./routes/asset.routes";
import userRoutes from "./routes/user.routes";
import { notFound } from "./middlewares/404.middleware";
import { PORT } from "./constants";

const routes = [assetRoutes, userRoutes,];

const app = express();

app.use(express.json());

app.use(cors());

routes.forEach(route => app.use(route));

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});