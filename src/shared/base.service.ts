import { Knex } from "knex";

export default class BaseService {

    constructor(protected db: Knex) {}

    async getCalcPaginationMeta(page: number, limit: number, tableName: string) {
        const offset = (page - 1) * limit;

        let [{ total }] = await this.db(tableName).count("* as total");

        const totalNumber = Number(total);
        const totalPages = Math.ceil(totalNumber / limit);

        return {
            offset,
            totalNumber,
            totalPages
        };
    }
                
}