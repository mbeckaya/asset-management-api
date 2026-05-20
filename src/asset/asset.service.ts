import BaseService from "../shared/base.service";
import type { AssetRecord } from "./asset.record";
import type { AssetDto } from "./asset.dto";
import type { PaginationDto } from "../shared/pagination.dto";

export default class AssetService extends BaseService {

    private tableName = "assets";

    private buildAssetQuery() {
        return this
            .db(`${this.tableName} as a`)
            .select(
                'a.id',
                'b.name as brand',
                't.name as type',
                'r.name as reseller',
                this.db.raw(`
                    DATE_FORMAT(a.purchased_at, '%Y-%m-%d') AS purchasedAt
                `),
                'a.model',
                'a.serial',
                'a.warranty_months AS warrantyMonths',
                'a.price'
            )
            .innerJoin('brands as b', 'a.brand_id', 'b.id')
            .innerJoin('types as t', 'a.type_id', 't.id')
            .innerJoin('resellers as r', 'a.reseller_id', 'r.id')
    }

    private toEntity(data: AssetDto): AssetRecord {
        return {
            brand_id: data.brandId!,
            type_id: data.typeId!,
            reseller_id: data.resellerId!,
            purchased_at: data.purchasedAt,
            model: data.model,
            serial: data.serial,
            warranty_months: data.warrantyMonths,
            price: Number(data.price)
        };
    }

    async findAll(page: number, limit: number): Promise<PaginationDto<AssetDto[]>> {
        const {
            offset,
            totalNumber,
            totalPages
        } = await this.getCalcPaginationMeta(
            page, 
            limit,
            this.tableName
        );

        const assets: AssetDto[] = await this
            .buildAssetQuery()
            .orderBy('a.id', 'asc')
            .limit(limit)
            .offset(offset);

        const assetsPagination = {
            limit,
            total: totalNumber,
            totalPages,
            page,
            data: assets
        };

        return assetsPagination;
    }

    async findById(id: number): Promise<AssetDto | undefined> {
        return this
            .buildAssetQuery()
            .where("a.id", id)
            .first();
    }

    async create(data: AssetDto): Promise<number> {
        const [ id ] = await this
            .db(this.tableName)
            .insert(this.toEntity(data));

        return id;
    }

    async updateById(id: number, data: AssetDto): Promise<boolean> {
        const affectedRows = await this
            .db(this.tableName)
            .where("id", id)
            .update(this.toEntity(data));

        return affectedRows > 0;
    }

    async deleteById(id: number): Promise<boolean> {
        const affectedRows = await this
            .db(this.tableName)
            .where("id", id)
            .del();

        return affectedRows > 0;
    }

}