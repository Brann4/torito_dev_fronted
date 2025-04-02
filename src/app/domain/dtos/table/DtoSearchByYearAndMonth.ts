export type DtoSearch = {
    page: number,
    perPage: number,
    search: string | null,
    sortField: string | null,
    sortOrder: number | null,
}