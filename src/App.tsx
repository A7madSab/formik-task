import { BrowserRouter } from "react-router-dom"
import { FC } from "react"
import { ThemeProvider } from "@mui/material"
import routes, { renderRoutes } from "navigation"
import createTheme from "theme"

const App: FC = () => {
    const theme = createTheme()

    return <ThemeProvider theme={theme}>{renderRoutes({ routes })}</ThemeProvider>
}

const AppWraper: FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

export default AppWraper
