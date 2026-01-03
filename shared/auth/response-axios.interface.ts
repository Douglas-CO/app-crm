export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

export interface PagingMetaResponse {
  next: number | null;
  previous: number | null;
  count: number;
  total_pages: number;
}

export enum HTTPResStatusCodeEnum {
  ///* Ok
  OK = 200,
  CREATED = 200,

  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,

  EXTERNAL_SERVER_ERROR = 503,
}
