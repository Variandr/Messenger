import { JwtPayload } from "jsonwebtoken";

export interface Payload {
  login: string;
  userId: number;
}

export interface UserIDJwtPayload extends JwtPayload {
  userId: number;
}
