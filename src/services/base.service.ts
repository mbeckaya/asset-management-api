import { Knex } from "knex";

export default class BaseService {

    constructor(protected db: Knex) {}
                
}