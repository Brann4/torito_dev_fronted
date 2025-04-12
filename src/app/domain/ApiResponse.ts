export interface ApiResponse<T> {
  sucess: boolean;
  message: string;
  data: T[];
}

export interface ApiResponseSingle<T> {
  sucess: boolean;
  message: string;
  data: T;
}

