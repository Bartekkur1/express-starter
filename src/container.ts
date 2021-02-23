import * as awilix from "awilix";
import { Logger } from "log4js";
import { registerErrorHandler } from "./api/apiErrorHandler";
import { registerApi, registerRouter } from "./api/router";
import { AppConfig, registerAppConfig } from "./config";
import { registerExpressServer } from "./container/expressServer";
import { registerLogger } from "./container/logger";
import { registerLowdb } from "./container/lowdbClient";
import { registerModelValidators } from "./validator";

export const createContainer = async (appConfig: AppConfig, logger: Logger): Promise<awilix.AwilixContainer> => {

    const container = awilix.createContainer({ injectionMode: "CLASSIC" });

    registerAppConfig(appConfig, container);
    registerLogger(container, logger);
    await registerLowdb(container);

    registerModelValidators(container);

    registerErrorHandler(container);
    registerApi(container);
    registerRouter(container);
    registerExpressServer(container);

    return container;
};