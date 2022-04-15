import { RouteCollection } from "../routes";
import create from "./crud/create";
import del from "./crud/delete";
import login from "./login";

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
];

export default routes;
