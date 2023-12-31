import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUserUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    return authenticateUseCase
}