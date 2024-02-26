import { StatusCode } from "../../helpers/api/RequestHelper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Response<T = any> {
  data?: T;
  status?: StatusCode;
}
