import { RouteCollection } from "../routes";
import create from "./crud/create";
import del from "./crud/delete";
import forgot from "./crud/forgot";
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
    path: "/api/v1/user/login",
    handler: login,
  },
  {
    httpMethod: "GET",
    path: "/api/v1/user/forgot",
    handler: forgot,
  },
  {
    httpMethod: "GET",
    path: "/api/v1/user/validateEmail",
    handler: validate,
  },
];

export default routes;
