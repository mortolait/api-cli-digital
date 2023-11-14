import { User } from "@prisma/client";
import { UserRepository } from "../repositories/users-repository";
import { InvalidCredentionsError } from "./errors/invalid-credations-error";
import { compare } from "bcrypt";

interface authenticateRequest{
    email: string,
    password: string
}
interface authenticateResponse{
    user: User
}
export class AuthenticateUseCase{
    constructor(private userRepository: UserRepository){}
    async execute({ email,password}:authenticateRequest):Promise<authenticateResponse>{
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new InvalidCredentionsError()
        }

        const passwordMatches = await compare(password, user.password_hash)

        if(!passwordMatches){
            throw new InvalidCredentionsError()
        }
        return {
            user
        }
    }
}