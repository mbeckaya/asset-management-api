import { Router } from "express";

import { db } from "../database/connection";
import AssetService from "../services/asset.service";
import AssetController from "../controllers/asset.controller";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateAssetBody } from "../middlewares/validate-body.middleware";
import { API_BASE } from "../constants";

const router = Router();

const assetService = new AssetService(db);
const assetController = new AssetController(assetService);

router.get(
  `${API_BASE}/assets`,
  assetController.getAssets
);

router.get(
  `${API_BASE}/assets/:id`,
  validateId,
  assetController.getAssetById
);

router.post(
  `${API_BASE}/assets`,
  validateAssetBody,
  assetController.createAsset
);

router.put(
  `${API_BASE}/assets/:id`,
  validateId,
  validateAssetBody,
  assetController.updateAssetById
);

router.delete(
  `${API_BASE}/assets/:id`,
  validateId,
  assetController.deleteAssetById
);

export default router;