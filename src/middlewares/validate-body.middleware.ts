import { Request, Response, NextFunction } from "express";
import status from "http-status";
import { db } from "../database/connection";
import { assetValidator } from "../validators/asset.validator";

const getIdByName = async (table: string, value: string): Promise<number | null> => {

    const row = await db(table)
        .select("id")
        .where("name", value)
        .first();

    if (!row) {
        return null;
    }

    return row.id;
};

const validateBody = (
    schema: { validate: (data: unknown) => { error?: any } }
) =>
    async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        const { error } = schema.validate(request.body);

        if (error) {
            return response
                .status(status.BAD_REQUEST)
                .send({ error: error.details });
        }

        const {
            brand,
            type,
            reseller,
            status: assetStatus
        } = request.body;

        const brandId = await getIdByName("brands", brand);

        if (!brandId) {
            return response.status(status.NOT_FOUND).send({
                message: `Brand "${brand}" not found`
            });
        }

        const typeId = await getIdByName("types", type);

        if (!typeId) {
            return response.status(status.NOT_FOUND).send({
                message: `Type "${type}" not found`
            });
        }

        const resellerId = await getIdByName("resellers", reseller);

        if (!resellerId) {
            return response.status(status.NOT_FOUND).send({
                message: `Reseller "${reseller}" not found`
            });
        }

        const statusId = await getIdByName("statuses", assetStatus);

        if (!statusId) {
            return response.status(status.NOT_FOUND).send({
                message: `Status "${assetStatus}" not found`
            });
        }

        request.body.brandId = brandId;
        request.body.typeId = typeId;
        request.body.resellerId = resellerId;
        request.body.statusId = statusId;

        next();
    };

export const validateAssetBody = validateBody(assetValidator);