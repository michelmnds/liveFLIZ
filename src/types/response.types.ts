interface ResponseBase {
  message: string | null;
}

export interface Res<TData> extends ResponseBase {
  data: TData;
}

export interface NotFound<TData = null> extends ResponseBase {
  data: TData;
}
