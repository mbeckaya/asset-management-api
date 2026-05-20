import BaseService from "../../shared/base.service";
import type { AssetAssignmentRecord } from "./asset-assignment.record";
import type { AssetAssignmentDto } from "./asset-assignment.dto";
import type { PaginationDto } from "../../shared/pagination.dto";

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

    private toEntity(data: AssetAssignmentDto): AssetAssignmentRecord {
        return {
            asset_id: data.assetId,
            user_id: data.userId,
            assigned_at: data.assignedAt,
            notes: data.notes ?? undefined,
            returned_at: data.returnedAt ?? undefined,
        };
    }

    async findAll(page: number, limit: number): Promise<PaginationDto<AssetAssignmentDto[]>> {
        const {
            offset,
            totalNumber,
            totalPages
        } = await this.getCalcPaginationMeta(
            page, 
            limit,
            this.tableName
        );
        
        const assetAssignments: AssetAssignmentDto[] = await this
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

    async findById(id: number): Promise<AssetAssignmentDto> {
        const assetAssignment: AssetAssignmentDto = await this
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

    async create(data: AssetAssignmentDto): Promise<number> {
        const [ id ] = await this
            .db(this.tableName)
            .insert(this.toEntity(data));

        return id;
    }
    
    async updateById(id: number, data: { returnedAt: string }): Promise<boolean> {
        const affectedRows = await this
            .db(this.tableName)
            .where("id", id)
            .where("assigned_at", "<=", data.returnedAt)
            .whereNull("returned_at")
            .update({ returned_at: data.returnedAt });

        return affectedRows > 0;
    }

}