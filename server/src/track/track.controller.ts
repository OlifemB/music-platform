import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, Query,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {UpdateTrackDto} from "./dto/update-track.dtp";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ObjectId} from "mongoose";


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Get()
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.trackService.getAll({count, offset})
    }


    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }


    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1}
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {picture, audio} = files
        return this.trackService.create(dto, picture[0], audio[0])
    }


    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.remove(id)
    }


    @Patch(':id')
    update(
        @Body() dto: UpdateTrackDto,
        @Param('id') id: ObjectId
    ) {
        return this.trackService.update({...dto, id})
    }


    @Post('/comments')
    addComment(
        @Body() dto: CreateCommentDto
    ) {
        return this.trackService.addComment({...dto})
    }


    @Post(':trackId/comments/:commentId')
    removeComment(
        @Param('trackId') trackId: ObjectId,
        @Param('commentId') commentId: ObjectId
    ) {
        return this.trackService.removeComment({trackId, commentId})
    }


    @Post(':id/listen')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id)
    }


    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query)
    }

}