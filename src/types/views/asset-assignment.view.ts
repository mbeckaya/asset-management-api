export interface AssetAssignmentView {
    id: number;
    assetId: number;
    userId: number;
    assignedAt: string;
    returnedAt: string | null;
    notes: string | null;
}