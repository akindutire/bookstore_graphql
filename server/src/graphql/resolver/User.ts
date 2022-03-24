import { Arg, Ctx, Field, InputType, Mutation, ObjectType, registerEnumType, Resolver } from "type-graphql";
import { compare, hash } from 'bcrypt'
import { getMongoRepository } from "typeorm";

import config from './../../core/config'
import User, { UserRole } from "../../entity/User";
import ContextInf from "../type/Context";
import JwtSvc from "../../service/util/JwtSvc";
import container  from './../../core/service-registry'
import { sendRefreshToken } from "../../service/util/sendRefreshToken";

@ObjectType()
class LoginResp {

    @Field( () => String )
    token: string | null = null

}

registerEnumType(UserRole, {
    name: "UserRole",
    description: "enlists various types of user"
})

@InputType()
class RegistrationInputType {

    @Field( () => String )
    email!: string 

    @Field( () => String )
    name!: string 

    @Field( () => String )
    pwd!: string

    @Field( () => String )
    confirm_pwd!: string

}

@Resolver()
export default class UserRes {

    private jwt: JwtSvc

    constructor() {
        this.jwt = container.resolve('jwt')
    }

    @Mutation( () => User)
    async register(
        @Arg("input", () => RegistrationInputType || null )  input: RegistrationInputType
    )
    {

        const userExist = await User.count({email: input.email})
        if(userExist) {
            throw new Error(`Email ${input.email} already exist`)
        }

        if(input.pwd != input.confirm_pwd) {
            throw new Error("Password and Confirm password doesn't match")
        }

        const password = await hash(input.pwd, 12)
        const u = User.create({email: input.email, pwd: password, name: input.name})
        return await u.save()

    }

    @Mutation( () => LoginResp)
    async login(
        @Arg("email", () => String )  email: string,
        @Arg("password", () => String )  password: string,
        @Ctx() {req, res} : ContextInf
    )
    {

        const uRepo = getMongoRepository(User)

        const user = await uRepo.findOne({where: {email}, select: ['pwd', 'email'] })
        if(!user) {
            throw new Error("User credentials incorrect")
        }

        const pwdVerified: boolean = await compare(password, user.pwd)
        if(!pwdVerified) {
            throw new Error("Login failed! User credentials incorrect")
        }
        
        sendRefreshToken(res, { email: user.email })

        const token : LoginResp = { token: this.jwt.createAccessToken({ email: user.email }) }
        return token

    }

}