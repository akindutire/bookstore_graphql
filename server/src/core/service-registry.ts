import { asClass, asValue, AwilixContainer, createContainer, Lifetime } from "awilix";
import JwtSvc from "../service/util/JwtSvc";

const container = createContainer()

container.register({
    jwt : asClass(JwtSvc, {lifetime: Lifetime.SINGLETON})
})

export default container;
