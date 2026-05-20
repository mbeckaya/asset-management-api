import express from "express";
import cors from "cors";
import "dotenv/config";

import assetRoutes from "./asset/asset.routes";
import assetAssignmentRoutes from "./asset/assignment/asset-assignment.routes";
import userRoutes from "./user/user.routes";
import { notFound } from "./shared/middlewares/404.middleware";
import { PORT } from "./shared/constants";

const routes = [assetRoutes, userRoutes, assetAssignmentRoutes,];

const app = express();

app.use(express.json());

app.use(cors());

routes.forEach(route => app.use(route));

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});