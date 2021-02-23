import { CollectionChain } from "lodash";

interface DbSchema {}

const databaseDefaults = (): DbSchema => {
    return {};
};

export { DbSchema, databaseDefaults };