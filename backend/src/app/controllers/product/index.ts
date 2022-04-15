import { RouteCollection } from "..";
import create from "./crud/create";
import del from "./crud/delete";
import get from "./crud/get";
import list from "./crud/list";
import update from "./crud/update";

const routes: RouteCollection[] = [
  {
    httpMethod: "GET",
    path: "/api/v1/products",
    handler: list,
  },
  {
    httpMethod: "GET",
    path: "/api/v1/products/:id",
    handler: get,
  },
  {
    httpMethod: "PUT",
    path: "/api/v1/products",
    handler: create,
  },
  {
    httpMethod: "PATCH",
    path: "/api/v1/products/:id",
    handler: update,
  },
  {
    httpMethod: "DELETE",
    path: "/api/v1/products/:id",
    handler: del,
  },
];

export default routes;
