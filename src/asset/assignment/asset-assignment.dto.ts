export interface AssetAssignmentDto {
    assetId: number;
    userId: number;
    assignedAt: string;
    
    id?: number;
    returnedAt?: string | null;
    notes?: string | null;
}