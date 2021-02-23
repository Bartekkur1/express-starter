import { asValue, AwilixContainer } from "awilix";
import { configure, Logger } from "log4js";

configure({
    appenders: {
        "out": { type: "stdout" },
        "log": { type: "file", filename: "./log.log" }
    },
    categories: {
        default: { appenders: ["out", "log"], level: "debug" }
    }
});

export const registerLogger = (container: AwilixContainer, logger: Logger): void => {
    container.register({
        logger: asValue(logger)
    });
};