import {Configuration, LoginApi} from "src/api";
import {APIMiddleware} from "src/api/client";

export const login = new LoginApi(new Configuration({
    basePath: "https://test-assignment.emphasoft.com",
    middleware: [new APIMiddleware()]
}));
