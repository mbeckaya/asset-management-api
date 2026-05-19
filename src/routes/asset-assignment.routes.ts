import { Router } from "express";

import { db } from "../database/connection";
import AssetAssignmentService from "../services/asset-assignment.service";
import AssetAssignmentController from "../controllers/asset-assignment.controller";
import { validateAuth } from "../middlewares/validate/validate-auth.middleware";
import { validateId } from "../middlewares/validate/validate-id.middleware";
import { validateAssetAssignmentBody } from "../middlewares/validate/validate-body.middleware";
import { API_BASE } from "../constants";

const router = Router();

const assetAssignmentService = new AssetAssignmentService(db);
const assetAssignmentController = new AssetAssignmentController(assetAssignmentService);

router.get(
    `${API_BASE}/asset-assignments`,
    validateAuth,
    assetAssignmentController.getAssetAssignments
);

router.post(
    `${API_BASE}/asset-assignments`,
    validateAuth,
    validateAssetAssignmentBody,
    assetAssignmentController.createAssetAssignments
);

router.patch(
    `${API_BASE}/asset-assignments/:id`,
    validateAuth,
    validateId,
    assetAssignmentController.updateAssetAssignmentById
);

export default router;