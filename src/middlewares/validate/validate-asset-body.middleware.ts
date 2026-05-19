import { Request, Response, NextFunction } from "express";
import status from "http-status";
import { db } from "../../database/connection";
import { assetValidator } from "../../validators/asset.validator";

const getIdByName = async (
    table: string,
    value: string
): Promise<number | null> => {
    const row = await db(table)
        .select("id")
        .where("name", value)
        .first();

    return row?.id ?? null;
};

const validateBody =
    (schema: { validate: (data: unknown) => { error?: any } }) =>
    async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        if (!request.body) {
            return response.status(status.BAD_REQUEST).send({
                message: "Request body is required"
            });
        }

        const { error } = schema.validate(request.body);

        if (error) {
            return response.status(status.BAD_REQUEST).send({
                error: error.details
            });
        }

        const {
            brand,
            type,
            reseller
        } = request.body;

        const lookups = [
            {
                key: "brandId",
                table: "brands",
                value: brand,
                label: "Brand"
            },
            {
                key: "typeId",
                table: "types",
                value: type,
                label: "Type"
            },
            {
                key: "resellerId",
                table: "resellers",
                value: reseller,
                label: "Reseller"
            }
        ];

        const results = await Promise.all(
            lookups.map(({ table, value }) => getIdByName(table, value))
        );

        const failedLookupIndex = results.findIndex((id) => !id);

        if (failedLookupIndex !== -1) {
            const failedLookup = lookups[failedLookupIndex];

            return response.status(status.NOT_FOUND).send({
                message: `${failedLookup.label} "${failedLookup.value}" not found`
            });
        }

        request.body = {
            ...request.body,
            brandId: results[0],
            typeId: results[1],
            resellerId: results[2]
        };

        next();
    };

export const validateAssetBody = validateBody(assetValidator);