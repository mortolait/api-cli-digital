import { FastifyInstance } from "fastify";
import { register } from "./register-user";
import { authenticate } from "./authenticate";

export async function usersRoutes(app: FastifyInstance){
    app.post("/users",register)
    app.post("/sessions", authenticate)
}