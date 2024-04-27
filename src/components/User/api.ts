import {useAuth} from "src/store/auth";
import {Configuration, ErrorContext, UsersApi} from "src/api";
import {APIMiddleware} from "src/api/client";

export const client = new UsersApi(new Configuration({
    basePath: "https://test-assignment.emphasoft.com",
    apiKey: () => "Token " + useAuth.getState().token,
    middleware: [new APIMiddleware()]
}));