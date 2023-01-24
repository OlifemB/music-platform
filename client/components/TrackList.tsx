import React from 'react';
import {ITrack} from "@/store/types/track";
import {Box, Grid} from "@mui/material";
import TrackItem from "@/components/TrackItem";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {selectPlayerState} from "@/store/slices/playerSlice";
import style from '@/styles/Track.module.scss'

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {

    const playerState = useTypedSelector(selectPlayerState)

    return (
        <div className={style.trackList}>
            {tracks &&
                tracks.map((track: ITrack) =>
                    <TrackItem
                        track={track}
                        key={track._id}
                        active={false}
                    />
                )}
        </div>
    );
};

export default TrackList;