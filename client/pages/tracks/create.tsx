import React, {useState} from 'react';
import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/StepWrapper";
import {Button, Container, Grid, TextField} from "@mui/material";
import FileUpload from "@/components/ui/FileUpload/FileUpload";
import useInput from "@/hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
import paths from "@/utils/paths";

const CreateTrack = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState('')
    const [audio, setAudio] = useState('')
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const prevStep = () => {
        if (activeStep > 0)
            setActiveStep(prev => prev - 1)
        else(
            router.push('/tracks')
        )
    }

    const nextStep = () => {
        if (activeStep < 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post(paths.actions.createTrack, formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }


    return (
        <MainLayout title={'Create track'}>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                  <Grid container direction="column" p={2} gap={2}>
                      <TextField
                          {...name}
                          label={"Track name"}
                      />

                      <TextField
                          {...artist}
                          label={"Artist name"}
                      />

                      <TextField
                          {...text}
                          label={"Track text"}
                          multiline
                          rows={3}
                      />
                  </Grid>
                }

                {activeStep === 1 &&
                  <Grid container direction="column" p={2} justifyContent="center" alignItems="center">
                      <FileUpload
                        setFile={setPicture}
                        accept={'image/*'}
                      >
                          <Button variant="outlined">
                              Load Picture
                          </Button>
                      </FileUpload>
                  </Grid>
                }

                {activeStep === 2 &&
                  <Grid container direction="column" p={2} justifyContent="center" alignItems="center">
                      <FileUpload setFile={setAudio} accept={'audio/*'}>
                          <Button variant="outlined">
                              Load Audio
                          </Button>
                      </FileUpload>
                  </Grid>
                }
            </StepWrapper>

            <Container>
                <Grid container justifyContent="space-between">
                    <Button disabled={activeStep < 0} onClick={prevStep}>
                        Back
                    </Button>

                    <Button disabled={activeStep > 2} onClick={nextStep}>
                        Next
                    </Button>
                </Grid>
            </Container>
        </MainLayout>
    )
};

export default CreateTrack;