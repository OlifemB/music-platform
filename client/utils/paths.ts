const serverPath = 'http://localhost:5000'
const clientPath = 'http://localhost:3000'

export enum pages {
    home = '/',
    albums = '/albums',
    tracks = '/tracks'
}

export enum server {
    static = '/static',
    audios = '/audio',
    images = '/image',
    tracks = '/tracks',
    comments = '/comments'
}

const paths = {
    client: {
        root: clientPath,
        home: clientPath + pages.home,
        albums: clientPath + pages.albums,
        tracks: clientPath + pages.tracks,
        createTrack: clientPath + pages.tracks + '/create'
    },
    server: {
        root: serverPath + '',
        static: server.static,
        audios: serverPath + server.static + server.audios,
        images: serverPath + server.static + server.images,
        tracks: serverPath + server.tracks,
        comments: serverPath + server.tracks + server.comments,
    },
    actions: {
        createTrack: serverPath + '/tracks/create',
        createAlbum: serverPath + '/albums/create',
    }
}

export default paths