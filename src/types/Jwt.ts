import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  name?: string;
  email?: string;
}
