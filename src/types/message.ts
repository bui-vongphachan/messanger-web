import { ObjectId } from "mongodb";

export interface Message {
  _id: string;
  content: string;
  senderId: string | ObjectId;
  recipientId: string | ObjectId;
  previousMessageId: string | ObjectId | null;
  sentDate: Date;
  isRead: boolean;
}
