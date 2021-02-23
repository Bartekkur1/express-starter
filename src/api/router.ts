import { asFunction, AwilixContainer } from "awilix";
import { Router } from "express";
import { ExpressConfig } from "../config";

export const createRouter = (api: Router, expressConfig: ExpressConfig): Router => 
    Router().use(expressConfig.path || "/", api);

export const createApi = (): Router => {
    return Router();
}

export const registerApi = (container: AwilixContainer) => {
    container.register({
        api: asFunction(createApi).singleton()
    });
};

export const registerRouter = (container: AwilixContainer): void => {
    container.register({
        router: asFunction(createRouter).singleton()
    });
};