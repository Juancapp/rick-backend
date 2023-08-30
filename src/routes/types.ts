export enum MainRoutes {
  USER = "/user",
}

export type BodyResponse<T> = {
  message?: string;
  data?: T;
  error: any;
};
