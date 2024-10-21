import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../../assets/logo.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FormEvent, useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import { Rating } from '@mui/material';

export default function Review() {
    const global = useContext(GlobalContext)

    const [review, setReview] = useState({
        name: "",
        rating: 0,
        comment: ""
    })

    const [btn, setbtn] = useState(false)

    const closeBtn = () => {
        global?.changeMenuReview(!global.MReview)
    }

    const postReview = async (event: FormEvent) => {
        setbtn(true)
        event.preventDefault()
        if (global?.isLog) setReview({ ...review, name: global.user.first_name + global.user.last_name })
        const result = await global?.makeReview(review.comment, review.rating, review.name)
        if (result) {
            global?.alertStatus(true, "success", "Gracias por dejar tu reseña!")
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        }
        else {
            global?.alertStatus(true, "error", "Error a dejar reseña")
            setbtn(false)
        }

    }

    const handleReviewComment = (comment: string) => {
        setReview({ rating: review.rating, comment: comment, name: review.name })
    }
    const handleReviewRating = (rating: number | null) => {
        if (rating) setReview({ rating: rating, comment: review.comment, name: review.name })
    }
    const handleReviewName = (name: string) => {
        setReview({ rating: review.rating, comment: review.comment, name: name })
    }


    return (
        <Backdrop open={global ? global.MReview : false} sx={{ zIndex: 10 }}>
            <Paper>
                <Box width={{ sm: 700, xs: 420 }} padding={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <img src={logo} width="40px" />
                        <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary' /></IconButton>
                    </Box>
                    <Box component="form" onSubmit={(e: FormEvent) => postReview(e)} autoComplete='off'>
                        <Typography variant='h6'>Deja tu Reseña!</Typography>
                        <Divider />
                        <Box padding={1} display={global?.isLog ? "none" : "block"}>
                            <TextField fullWidth type="text" id='name' size="small" label="Nombre" value={review.name} 
                            onChange={(e) => handleReviewName(e.target.value)} required={global?.isLog ? false : true} />
                        </Box>
                        <Typography paddingTop={1} variant='body1'>Escribe tu comentario</Typography>
                        <Box padding={1}>
                            <TextField multiline rows={6} fullWidth type="text" id='comment' size="small" value={review.comment} onChange={(e) => handleReviewComment(e.target.value)} required />
                        </Box>
                        <Typography variant='body1'>Calificanos!</Typography>
                        <Box padding={1}>
                            <Rating name="rating-review" value={review.rating} onChange={(_e, newValue) => handleReviewRating(newValue)} />
                        </Box>
                        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                            <Button disabled={btn} size="small" color='secondary' variant="contained" type="submit">
                                <Typography sx={{ marginLeft: "20px" }} variant='body2'>Dejar Reseñar</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Backdrop>
    )

}
