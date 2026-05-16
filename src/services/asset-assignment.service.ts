import BaseService from "./base.service";

import type { AssetAssignmentEntity } from "../types/entities/asset-assignment.entity";
import type { AssetAssignmentView } from "../types/views/asset-assignment.view";
import type { PaginationView } from "../types/views/pagination.view";

export default class AssetAssignmentService extends BaseService {

    private tableName = "asset_assignments";

    private buildAssetAssignmentQuery() {
        return this
            .db(this.tableName)
            .select(
                "id",
                "asset_id as assetId",
                "user_id as userId",
                this.db.raw(`
                    DATE_FORMAT(assigned_at, '%Y-%m-%d') AS assignetAt
                `),
                this.db.raw(`
                    DATE_FORMAT(returned_at, '%Y-%m-%d') AS returnedAt
                `),
                "notes",
            );
    }

    private toEntity(data: AssetAssignmentView): AssetAssignmentEntity {
        return {
            asset_id: data.assetId,
            user_id: data.userId,
            assigned_at: data.assignedAt,
            notes: data.notes ?? undefined,
            returned_at: data.returnedAt ?? undefined,
        };
    }

    async findAll(page: number, limit: number): Promise<PaginationView<AssetAssignmentView[]>> {
        const {
            offset,
            totalNumber,
            totalPages
        } = await this.getCalcPaginationMeta(
            page, 
            limit,
            this.tableName
        );
        
        const assetAssignments: AssetAssignmentView[] = await this
            .buildAssetAssignmentQuery()
            .limit(limit)
            .offset(offset);
        
        const assetAssignmentsPagination = {
            limit,
            total: totalNumber,
            totalPages,
            page,
            data: assetAssignments
        };

        return assetAssignmentsPagination;
    }

    async findById(id: number): Promise<AssetAssignmentView> {
        const assetAssignment: AssetAssignmentView = await this
            .buildAssetAssignmentQuery()
            .where("id", id)
            .first();
            
        return assetAssignment; 
    }

    async isAvailableById(assetId: number): Promise<boolean> {
        const activeAssignmentExists = await this
            .db(this.tableName)
            .where("asset_id", assetId)
            .whereNull("returned_at")
            .first("id");

        return !activeAssignmentExists;
    }

    async create(data: AssetAssignmentView): Promise<number> {
        const [ id ] = await this
            .db(this.tableName)
            .insert(this.toEntity(data));

        return id;
    }

}