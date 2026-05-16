import { Router } from "express";

import { db } from "../database/connection";

import AssetAssignmentService from "../services/asset-assignment.service";
import AssetAssignmentController from "../controllers/asset-assignment.controller";
import { validateAuth } from "../middlewares/validate/validate-auth.middleware";
import { API_BASE } from "../constants";

const router = Router();

const assetAssignmentService = new AssetAssignmentService(db);
const assetAssignmentController = new AssetAssignmentController(assetAssignmentService);

router.get(
    `${API_BASE}/asset-assignments`,
    validateAuth,
    assetAssignmentController.getAssetAssignments
);

export default router;