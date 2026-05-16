import BaseService from "./base.service";

import type { AssetAssignmentView } from "../types/views/asset-assignment.view";
import type { PaginationView } from "../types/views/pagination.view";

export default class AssetAssignmentService extends BaseService {

    private buildAssetAssignmentQuery() {
        return this
            .db("asset_assignments")
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

    async findAll(page: number, limit: number): Promise<PaginationView<AssetAssignmentView[]>> {
        const {
            offset,
            totalNumber,
            totalPages
        } = await this.getCalcPaginationMeta(
            page, 
            limit,
            "asset_assignments"
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

}