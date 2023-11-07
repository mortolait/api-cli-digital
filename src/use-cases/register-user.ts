import { User } from "@prisma/client"
import { hash } from "bcrypt"
import { UserRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest{
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse{
    user: User
}

export class RegisterUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({name,email,password}: RegisterUseCaseRequest):Promise<RegisterUseCaseResponse>{
        const userSameEmail = await this.userRepository.findByEmail(email)
        if(userSameEmail){
            throw new UserAlreadyExistsError()
        }
        const password_hash = await hash(password,6) 
        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })
        return { 
            user
        }
    }
}