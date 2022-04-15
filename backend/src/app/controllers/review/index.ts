import { RouteCollection } from "..";
import create from "./crud/create";
import update from "./crud/update";
import del from "./crud/delete";
import getByUser from "./crud/getByUser";
import getByProduct from "./crud/getByProduct";

const routes: RouteCollection[] = [
  {
    httpMethod: "GET",
    path: "/api/v1/products/reviews/:userEmail",
    handler: getByUser,
  },
  {
    httpMethod: "GET",
    path: "/api/v1/products/reviews/:productId",
    handler: getByProduct,
  },
  {
    httpMethod: "PUT",
    path: "/api/v1/products/reviews/",
    handler: create,
  },
  {
    httpMethod: "PATCH",
    path: "/api/v1/products/reviews/:id",
    handler: update,
  },
  {
    httpMethod: "DELETE",
    path: "/api/v1/products/reviews/:id",
    handler: del,
  },
];

export default routes;
