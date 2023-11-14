import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { makeAuthenticateUserUseCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredentionsError } from "../../../use-cases/errors/invalid-credations-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUserUseCase()
        const { user } = await authenticateUseCase.execute({ email, password })

        const token = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                user: user.id
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: "7d"
                }
            }
        )

        return reply
            .setCookie("refreshToken", refreshToken, {
                path: "/",
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(201).send({
                token,
            })
    } catch (error) {
        if(error instanceof InvalidCredentionsError){
            return reply.status(400).send({ message: error.message})
        }
    }
}