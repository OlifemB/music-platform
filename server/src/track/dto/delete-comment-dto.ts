import {ObjectId} from "mongoose";

export class DeleteCommentDto {
    readonly trackId: ObjectId
    readonly commentId: ObjectId
}