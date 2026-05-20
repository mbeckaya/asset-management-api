import { Request, Response } from "express";
import status from "http-status";

import BaseController from "../shared/base.controller";
import AssetService from "./asset.service";

export default class AssetController extends BaseController {

    constructor(private service: AssetService) {
        super();
    }

    getAssets = async (request: Request, response: Response) => {
        const page = typeof request.query.page === "string" ? Number(request.query.page) : 1;
        const limit = typeof request.query.limit === "string" ? Number(request.query.limit) : 10;

        const assets = await this.service.findAll(page, limit);

        response.status(status.OK).send(assets);
    }

    getAssetById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        const asset = await this.service.findById(id);

        if (!asset) return this.getNotFound("Asset", response);

        response.status(status.OK).send(asset);
    }

    createAsset = async (request: Request, response: Response) => {
        const id = await this.service.create(request.body);

        const asset = await this.service.findById(id);

        if (!asset) return this.getNotFound("Asset", response);

        response.status(status.CREATED).send(asset);
    }

    updateAssetById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        const isUpdated = await this.service.updateById(id, request.body);

        if (!isUpdated) return this.getNotFound("Asset", response);

        const assetUpdated = await this.service.findById(id);

        response.status(status.OK).send(assetUpdated);
    }

    deleteAssetById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        const isDeleted = await this.service.deleteById(id);

        if (!isDeleted) return this.getNotFound("Asset", response);

        response.sendStatus(status.NO_CONTENT);
    }
    
}