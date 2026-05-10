import { Router } from "express";
import assetRoutes from "./asset.routes";

const routes: Router[] = [
    assetRoutes,
];

export default routes;