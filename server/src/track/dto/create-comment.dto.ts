import {ObjectId} from "mongoose";

export class CreateCommentDto {
    readonly text: string;
    readonly username: string;
    readonly trackId: ObjectId;
}