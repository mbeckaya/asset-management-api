import { Router } from "express";

import { db } from "../database/connection";
import AssetService from "../services/asset.service";
import AssetController from "../controllers/asset.controller";
import { validateAuth } from "../middlewares/validate/validate-auth.middleware";
import { validateId } from "../middlewares/validate/validate-id.middleware";
import { validateAssetBody } from "../middlewares/validate/validate-asset-body.middleware";
import { API_BASE } from "../constants";

const router = Router();

const assetService = new AssetService(db);
const assetController = new AssetController(assetService);

router.get(
  `${API_BASE}/assets`,
  validateAuth,
  assetController.getAssets
);

router.get(
  `${API_BASE}/assets/:id`,
  validateAuth,
  validateId,
  assetController.getAssetById
);

router.post(
  `${API_BASE}/assets`,
  validateAuth,
  validateAssetBody,
  assetController.createAsset
);

router.put(
  `${API_BASE}/assets/:id`,
  validateAuth,
  validateId,
  validateAssetBody,
  assetController.updateAssetById
);

router.delete(
  `${API_BASE}/assets/:id`,
  validateAuth,
  validateId,
  assetController.deleteAssetById
);

export default router;