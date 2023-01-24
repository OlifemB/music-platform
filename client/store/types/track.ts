export interface IComment {
    _id: string;
    username: string;
    text: string;
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
}

export interface TrackState {
    tracks: ITrack[];
    error: string;
}

// export enum TrackActionTypes {
//     FETCH_TRACKS = 'tracks/fetch',
//     FETCH_TRACKS_ERROR = 'tracks/fetch-error'
// }
//
// interface FetchTracksActions {
//     type: TrackActionTypes.FETCH_TRACKS;
//     payload: ITrack[];
// }
//
// interface FetchTracksErrorActions {
//     type: TrackActionTypes.FETCH_TRACKS_ERROR;
//     payload: string;
// }
//
// export type TrackActions = FetchTracksActions | FetchTracksErrorActions