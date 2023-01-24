import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Model, ObjectId} from "mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateTrackDto} from "./dto/update-track.dtp";
import {DeleteCommentDto} from "./dto/delete-comment-dto";
import {FileService, FileType} from "../file/file.service";

@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {}



    async getAll({count = 10, offset = 0}): Promise<Track[]> {
        return await this.trackModel.find().skip(offset).limit(count);
    }



    async getOne(id: ObjectId): Promise<Track> {
        return await this.trackModel.findById(id).populate('comments');
    }



    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.create(FileType.AUDIO, audio)
        const picturePath = this.fileService.create(FileType.IMAGE, picture)
        return await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
    }



    async update(dto: UpdateTrackDto): Promise<Object> {
        const track = await this.trackModel.findByIdAndUpdate(
            {"_id": dto.id},
            {...dto}
        )
        return {message: 'Update successful', payload: {id: track._id}}
    }



    async remove(id: ObjectId): Promise<Object> {
        const track = await this.trackModel.findByIdAndRemove(id)
        return {message: 'Delete success', payload: {id: track._id}}
    }



    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({...dto})

        // @ts-ignore
        track.comments.push(comment._id)
        await track.save();
        return comment;
    }



    async removeComment(dto: DeleteCommentDto): Promise<any> {
        console.log(dto)
        return this.trackModel.findByIdAndDelete(dto.commentId)
    }



    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }



    async search(query: string): Promise<Track[]> {
        console.log(query)
        const tracks = await this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        console.log(tracks)
        return tracks;
    }
}