// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import type { User } from "../interfaces/userFromSunlight";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "sunrise-service",
  cookieOptions: {
    maxAge: 7200,
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  // eslint-disable-next-line no-unused-vars
  export interface IronSessionData {
    user?: User;
  }
}