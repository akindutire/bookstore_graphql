import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { hash } from 'bcrypt'
import User from "../../entity/User";

@ObjectType()
class LoginType {

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

    @Mutation( () => User)
    async register(
        @Arg("input", () => RegistrationInputType || null )  input: RegistrationInputType
    )
    {

        if(input.pwd != input.confirm_pwd) {
            return null
        }

        const password = await hash(input.pwd, 4)
        return await User.create({email: input.email, pwd: password, name: input.name}).save()

    }

    @Mutation( () => LoginType)
    login(
        @Arg("email", () => String )  email: string
    )
    {

    }

}