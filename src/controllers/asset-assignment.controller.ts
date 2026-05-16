import { Request, Response } from "express";
import status from "http-status";

import BaseController from "./base.controller";
import AssetAssignmentService from "../services/asset-assignment.service";

export default class AssetAssignmentController extends BaseController {

    constructor(private service: AssetAssignmentService) {
        super();
    }

    getAssetAssignments = async (request: Request, response: Response) => {
        const page = typeof request.query.page === "string" ? Number(request.query.page) : 1;
        const limit = typeof request.query.limit === "string" ? Number(request.query.limit) : 10;

        const assetAssignments = await this.service.findAll(page, limit);

        response.status(status.OK).send(assetAssignments);
    }

    createAssetAssignments = async (request: Request, response: Response) => {
        const assetId = Number(request.body.assetId);

        const isAvailable = await this.service.isAvailableById(assetId);

        if (!isAvailable) return this.getNotFound(`Open asset assignment for assetId: ${assetId}`, response);

        const id = await this.service.create(request.body);

        const assetAssignment = await this.service.findById(id);

        if (!assetAssignment) return this.getNotFound("Asset Assignment", response);

        response.status(status.CREATED).send(assetAssignment);
    }
}