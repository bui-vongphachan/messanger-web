import { Message } from "./message";

export interface User {
  _id: string;
  email: string;
  name: string;
  image: string;
}

export interface Chat {
  user: User;
  latestMessage: Message | null;
}
