type NotificationType =
  | "upload"
  | "verification"
  | "job"
  | "warning"
  | "password"
  | "security"
  | "setup";

export type Notification = {
  id: string;
  title: string;
  time: string;
  description: string;
  read: boolean;
  type: NotificationType; // upload, verification, job, warning, password, security, setup
};

export const defaultNotification: Notification = {
  id: "",
  title: "",
  description: "",
  time: "",
  read: false,
  type: "upload",
};
