import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { } from 'awilix'
import { compare, hash } from 'bcrypt'
import { createQueryBuilder } from "typeorm";
import { sign } from 'jsonwebtoken'

import config from './../../core/config'
import User from "../../entity/User";
import ContextInf from "../Context";
import JwtSvc from "../../service/util/JwtSvc";
import container  from './../../core/service-registry'

@ObjectType()
class LoginResp {

    @Field( () => String )
    token: string | null = null

}

@InputType()
class RegistrationInputType {

    @Field( () => String )
    email: string = ''

    @Field( () => String )
    name: string = ''

    @Field( () => String )
    pwd: string = ''

    @Field( () => String )
    confirm_pwd: string = ''

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

        if(input.pwd != input.confirm_pwd) {
            throw new Error("Password and Confirm password doesn't match")
        }

        const password = await hash(input.pwd, 12)
        return await User.create({email: input.email, pwd: password, name: input.name}).save()

    }

    @Mutation( () => LoginResp)
    async login(
        @Arg("email", () => String )  email: string,
        @Arg("password", () => String )  password: string,
        @Ctx() {req, res} : ContextInf
    )
    {

        const user = await createQueryBuilder('users').from(User, 'u').select('u.email, u.pwd').where('u.email=:em', {em: email}).getOne()
        if(!user) {
            throw new Error("User credentials incorrect")
        }

        const pwdVerified: boolean = await compare(password, user.pwd)
        if(!pwdVerified) {
            throw new Error("Login failed! User credentials incorrect")
        }
        
        
        res.cookie(
            config.server.cookiePrefix+'refreshID', 
            this.jwt.createRefreshToken({ email: user.email }),
            {
                httpOnly: true
            }
        )

        
        const token : LoginResp = { token: this.jwt.createAccessToken({ email: user.email }) }
        return token


    }

}