export enum MainRoutes {
  USER = "/user",
  CHARACTERS = "/characters",
}

export type BodyResponse<T> = {
  message?: string;
  data?: T;
  error: any;
};
