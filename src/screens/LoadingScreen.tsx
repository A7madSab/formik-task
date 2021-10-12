import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100vh",
    },
})

const LoadingScreen = () => {
    const classes = useStyles()

    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.root}>
            <CircularProgress color="primary" size={120} />
        </Grid>
    )
}

export default LoadingScreen
