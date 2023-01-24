import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {AlbumModule} from "./album/album.module";
import {UserModule} from "./user/user.module";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {ConfigModule} from "@nestjs/config";

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || '27017'
const DB_NAME = process.env.DB_NAME || 'music-platform'
const connect = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

console.log(connect)

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot(connect),
        FileModule,
        UserModule,
        AlbumModule,
        TrackModule,
    ]
})

export class AppModule {
}