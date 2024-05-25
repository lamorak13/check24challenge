export type UserNotification = {
  type: MessageType;
  message: string;
};

export enum MessageType {
  ERROR = "Error",
  WARNING = "Warning",
  UPDATE = "Update",
  SUCCESS = "Success",
}
