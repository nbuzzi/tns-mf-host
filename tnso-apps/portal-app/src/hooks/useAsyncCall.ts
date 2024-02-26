import { useAsyncCall as useAsyncCallShared, runAsyncCall as runAsyncCallShared, AsyncApiCallStatus as AsyncApiCallStatusShared } from "./useAsyncCallShared";

export type AsyncApiCallStatus<TRes> = AsyncApiCallStatusShared<TRes>;

export const useAsyncCall = useAsyncCallShared;

export const runAsyncCall = runAsyncCallShared;
