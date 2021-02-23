import { asClass, asValue, AwilixContainer } from "awilix";
import { Logger } from "log4js";
import low from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
import { LowdbConfig } from "../config";
import { DbSchema, databaseDefaults } from "../model/dbSchema";

export class LowdbClient {
    private adapter: low.AdapterAsync<DbSchema>;
    private db?: low.LowdbAsync<DbSchema>;
    private logger: Logger;

    public async init(): Promise<void> {
        if (this.db === undefined) {
            this.db = await low(this.adapter);
        }
    }

    constructor(lowdbConfig: LowdbConfig, logger: Logger) {
        this.adapter = new FileAsync(lowdbConfig.path);
        this.logger = logger;
    }

    public getAdapter(): low.LowdbAsync<DbSchema> {
        if (this.db === undefined) throw new Error("Database not initialized!");
        return this.db;
    }

    private databaseIsEmpty() {
        return Object.keys(this.getAdapter().value()).length === 0;
    }
}

export const registerLowdb = async (container: AwilixContainer): Promise<void> => {
    container.register({
        lowdb: asClass(LowdbClient).singleton()
    });
    await container.resolve<LowdbClient>("lowdb").init();
};