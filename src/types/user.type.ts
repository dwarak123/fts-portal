import { buffer } from 'node:stream/consumers';
export default interface IUser {
  id?: any | null,
  username?: string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
  photo?: Buffer;
  mimeType?: string;
}