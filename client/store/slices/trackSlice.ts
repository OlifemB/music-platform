import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ITrack} from "@/store/types/track";
import {RootState} from "@/store";
import {HYDRATE} from "next-redux-wrapper";


interface TrackState {
    tracks: ITrack[];
    isLoading: boolean;
    currentTrack?: ITrack[] | null;
    currentTrackLoading?: boolean;
}

const initialState: TrackState = {
    tracks: [],
    isLoading: false,
    currentTrack: null,
    currentTrackLoading: false,
}


export const fetchTracks = createAsyncThunk(
    'tracks/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITrack[]>('http://localhost:5000/tracks')
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Error")
        }
    }
)

export const fetchOneTrack = createAsyncThunk(
    'tracks/fetchOne',
    async (id: string) => {
        console.log(id)
        try {
            const response = await axios.get<ITrack[]>('http://localhost:5000/tracks/' + id)
            return response.data
        } catch (e) {
            return e
        }
    }
)


export const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTracks.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchTracks.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
            state.isLoading = false
            state.tracks = action.payload
        },
        [fetchTracks.rejected.type]: (state) => {
            state.isLoading = true
            state.tracks = []
        },
        [fetchOneTrack.pending.type]: (state) => {
            state.currentTrackLoading = true
        },
        [fetchOneTrack.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
            state.currentTrackLoading = false
            state.currentTrack = action.payload
        },
        [fetchOneTrack.rejected.type]: (state) => {
            state.currentTrackLoading = true
            state.currentTrack = null
        },
    }
})

export const selectTracksState = (state: RootState) => state.tracks
export const trackActions = trackSlice.actions
export default trackSlice.reducer