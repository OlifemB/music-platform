import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop()
    name: string

    @Prop()
    login: string

    @Prop()
    password: string

    @Prop()
    picture: string
}

export const UserSchema = SchemaFactory.createForClass(User)