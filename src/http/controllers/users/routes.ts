import { FastifyInstance } from "fastify";
import { register } from "./register-user";

export async function usersRoutes(app: FastifyInstance){
    app.post("/users",register)
}