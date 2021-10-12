import { createTheme } from "@mui/material"

const createMUITheme = () => {
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 400,
                sm: 600,
                md: 980,
                lg: 1024,
                xl: 1200,
            },
        },
        palette: {
            primary: {
                main: "#FF0000",
            },
            secondary: {
                main: "#FFFFFF",
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#FFFFFF",
                        padding: "0px",
                        margin: "0px",
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    subtitle1: {
                        fontSize: "14px",
                    },
                },
            },
        },
        typography: {
            fontFamily: "Cairo",
        },
    })

    return theme
}

export default createMUITheme
