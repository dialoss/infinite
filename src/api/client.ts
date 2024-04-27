import {QueryClient} from "react-query";
import {ErrorContext, Middleware} from "src/api/runtime";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export class APIMiddleware implements Middleware {
    onError = async function (context: ErrorContext) {
        let r = await context.response?.json();
        window.app.alert({message: "Ошибка " + JSON.stringify(r), type: 'error'});
        return context.response;
    }
}