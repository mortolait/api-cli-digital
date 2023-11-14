import fastify from "fastify";
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie";

import { usersRoutes } from "./http/controllers/users/routes";
import { env } from "./env";
export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },
    sign:{
        expiresIn: "30m",
    }
})
app.register(fastifyCookie);
app.register(usersRoutes)