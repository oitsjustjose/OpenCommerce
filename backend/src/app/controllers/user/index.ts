import { RouteCollection } from "..";
import create from "./crud/create";
import del from "./crud/delete";
import forgot from "./auth/forgot";
import login from "./auth/login";
import validate from "./auth/validate";

const routes: RouteCollection[] = [
  {
    httpMethod: "PUT",
    path: "/api/v1/user",
    handler: create,
  },
  {
    httpMethod: "DELETE",
    path: "/api/v1/user",
    handler: del,
  },
  {
    httpMethod: "POST",
    path: "/api/v1/user/auth/login",
    handler: login,
  },
  {
    httpMethod: "GET",
    path: "/api/v1/user/auth/forgot",
    handler: forgot,
  },
  {
    httpMethod: "GET",
    path: "/api/v1/user/auth/email/validate",
    handler: validate,
  },
];

export default routes;
