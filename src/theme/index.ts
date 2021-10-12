import { createTheme } from "@mui/material"

const createMUITheme = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#f16d36",
            },
            secondary: {
                main: "#387f94",
            },
        },
        typography: {
            fontFamily: "Cairo",
        },
    })

    return theme
}

export default createMUITheme
