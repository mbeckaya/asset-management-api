export interface PaginationView<T> {
    limit: number;
    total: number;
    totalPages: number;
    page: number;
    data: T;
}