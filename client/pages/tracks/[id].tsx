import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {ITrack} from "@/store/types/track";
import {useRouter} from 'next/router'
import CommentItem from "@/components/CommentItem";
import Link from "next/link";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {fetchOneTrack, selectTracksState} from "@/store/slices/trackSlice";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import axios from "axios";
import imageLoader from "@/utils/imageLoader";
import Image from "next/image";
import paths from "@/utils/paths";
import useInput from "@/hooks/useInput";

interface TrackPageProps {
    serverTrack?: ITrack,
    id?: string
}

const TrackPage: React.FC<TrackPageProps> = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>({
        _id: "",
        audio: "",
        comments: [],
        picture: '',
        name: '',
        artist: '',
        listens: 0,
        text: ''
    })
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const username = useInput('')
    const comment = useInput('')
    const {id} = router.query


    useEffect(() => {
        axios.get(`${paths.server.tracks}/${id}`).then(res => {
            setTrack(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.warn(err)
        })
    }, [])


    const addComment = async () => {
        try {
            const responce = await axios.post(paths.server.comments, {
                username: username.value,
                text: comment.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, responce.data]})
        } catch (e) {
            console.log(e)
        }
    }


    if (isLoading)
        return null


    return (
        <MainLayout title={track.name + ' - ' + track.artist}>
            <Container>
                <Link href={paths.client.tracks}>
                    <Button variant={"outlined"} sx={{mb: 2}}>
                        Back
                    </Button>
                </Link>

                <Grid container>
                    <Image src={track.picture} loader={imageLoader} alt={track.name} width={200} height={200}
                           className={'cover'}/>

                    <div>
                        <h2>Track - {track.name}</h2>
                        <h3>Artist - {track.artist}</h3>
                        <h3>Listens - {track.listens}</h3>
                    </div>
                </Grid>

                <h2>Track Text</h2>

                <p>{track.text}</p>

                <h2>Comments</h2>

                <Grid container gap={2}>
                    <TextField
                        fullWidth
                        {...username}
                        label={"Your name"}
                    />

                    <TextField
                        fullWidth
                        {...comment}
                        multiline
                        rows={4}
                        label={"Comment"}
                    />

                    <Button onClick={addComment}>Sent</Button>
                </Grid>

                <Grid container flexDirection="column" gap={2}>
                    {track.comments.map(comment =>
                        <CommentItem comment={comment}/>
                    )}
                </Grid>

            </Container>
        </MainLayout>
    );
};

export default TrackPage;