import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserUseCase } from "../../../use-cases/factories/make-register-user-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUserUseCase = makeRegisterUserUseCase()
         await registerUserUseCase.execute({
            name,
            email,
            password
        })
    } catch (err) {
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send(err.message)
        }
    }

    return reply.status(201).send("user create")
}