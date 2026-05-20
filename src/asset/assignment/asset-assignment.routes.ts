import { Router } from "express";

import { db } from "../../shared/database";
import AssetAssignmentService from "./asset-assignment.service";
import AssetAssignmentController from "./asset-assignment.controller";
import { validateAuth } from "../../shared/middlewares/auth.middleware";
import { validateId } from "../../shared/middlewares/id.middleware";
import { validateAssetAssignmentBody } from "../../shared/middlewares/body.middleware";
import { API_BASE } from "../../shared/constants";

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