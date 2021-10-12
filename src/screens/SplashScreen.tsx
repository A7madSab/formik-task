import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.primary.light,
    },
}))

const SplashScreen = () => {
    const classes = useStyles()

    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.root}>
            <CircularProgress color="primary" size={120} />
        </Grid>
    )
}

export default SplashScreen
