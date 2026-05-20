import { Router } from "express";

import { db } from "../shared/database";
import AssetService from "./asset.service";
import AssetController from "./asset.controller";
import { validateAuth } from "../shared/middlewares/auth.middleware";
import { validateId } from "../shared/middlewares/id.middleware";
import { validateAssetBody } from "./asset-body.middleware";
import { API_BASE } from "../shared/constants";

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