import BaseService from "./base.service";
import type { AssetEntity } from "../types/entities/asset.entity";
import type { AssetView } from "../types/views/asset.view";
import type { PaginationView } from "../types/views/pagination.view";

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
                's.name as status',
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
            .innerJoin('statuses as s', 'a.status_id', 's.id');
    }

    private toEntity(data: AssetView): AssetEntity {
        return {
            brand_id: data.brandId!,
            type_id: data.typeId!,
            reseller_id: data.resellerId!,
            status_id: data.statusId!,
            purchased_at: data.purchasedAt,
            model: data.model,
            serial: data.serial,
            warranty_months: data.warrantyMonths,
            price: Number(data.price)
        };
    }

    async findAll(page: number, limit: number): Promise<PaginationView<AssetView[]>> {
        const {
            offset,
            totalNumber,
            totalPages
        } = await this.getCalcPaginationMeta(
            page, 
            limit,
            this.tableName
        );

        const assets: AssetView[] = await this
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

    async findById(id: number): Promise<AssetView | undefined> {
        return this
            .buildAssetQuery()
            .where("a.id", id)
            .first();
    }

    async create(data: AssetView): Promise<number> {
        const [ id ] = await this
            .db(this.tableName)
            .insert(this.toEntity(data));

        return id;
    }

    async updateById(id: number, data: AssetView): Promise<boolean> {
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