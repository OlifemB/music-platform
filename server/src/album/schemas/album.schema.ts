import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Track} from "../../track/schemas/track.schema";
import {User} from "../../user/schemas/user.schema";
import * as mongoose from "mongoose";

export type AlbumDocument = HydratedDocument<Album>

@Schema()
export class Album {

    @Prop()
    name: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    artist: User | User[]

    @Prop()
    picture: string

    @Prop()
    tracks: Track[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album)