import { RouteCollection } from "..";
import create from "./crud/create";
import del from "./crud/delete";
import get from "./crud/get";
import list from "./crud/list";
import update from "./crud/update";

import rupdate from "./reviews/update";
import rcreate from "./reviews/create";
import rdel from "./reviews/delete";

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
  {
    httpMethod: "PUT",
    path: "/api/v1/products/:id/reviews",
    handler: rcreate,
  },
  {
    httpMethod: "PATCH",
    path: "/api/v1/products/:id/reviews/:revId",
    handler: rupdate,
  },
  {
    httpMethod: "DELETE",
    path: "/api/v1/products/:id/reviews/:revId",
    handler: rdel,
  },
];

export default routes;
