import React from 'react';
import {ITrack} from "@/store/types/track";
import {Card, Grid, IconButton} from "@mui/material";
import style from "@/styles/Track.module.scss"
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {playerActions} from "@/store/slices/playerSlice";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import Link from "next/link";
import Image from "next/image";
import useImage from "@/hooks/useImage";
import paths from "@/utils/paths";
import imageLoader from "@/utils/imageLoader";


interface TrackItemProps {
    track: ITrack,
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({track, active}) => {
    const dispatch = useAppDispatch()
    console.log(active)

    const router = useRouter()

    const {setTrack, playTrack} = playerActions


    const play = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(setTrack(track))
        dispatch(playTrack())
    }


    return (
        <div className={style.track}>
            <IconButton onClick={play}>
                {
                    active
                        ? <Pause/>
                        : <PlayArrow/>
                }
            </IconButton>

            <Image
                src={track.picture}
                loader={imageLoader}
                alt={track.name}
                width={50}
                height={50}
                className={'cover'}
            />

            <div className={style.description}>
                <div className={style.name}>{track.name}</div>
                <div className={style.artist}>{track.artist}</div>
            </div>

            <div className={style.time}>time</div>


            <Link href={'/tracks/' + track._id}>
                View Track Page
            </Link>

            <IconButton onClick={(e) => e.stopPropagation()}>
                <Delete/>
            </IconButton>
        </div>
    );
};

export default TrackItem;