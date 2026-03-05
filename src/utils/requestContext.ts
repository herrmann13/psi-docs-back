import { AsyncLocalStorage } from "node:async_hooks";

type RequestContext = {
    actorUserId: number | null;
};

const storage = new AsyncLocalStorage<RequestContext>();

export function runWithRequestContext(context: RequestContext, callback: () => void) {
    storage.run(context, callback);
}

export function getRequestContext() {
    return storage.getStore();
}
