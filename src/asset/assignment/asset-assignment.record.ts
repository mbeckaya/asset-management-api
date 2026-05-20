export interface AssetAssignmentRecord {
    asset_id: number;
    user_id: number;
    assigned_at: string;

    id?: number;
    returned_at?: string;
    notes?: string;
}