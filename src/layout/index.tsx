import { FC } from "react"
import Grid from "@mui/material/Grid"

const Layout: FC = ({ children }) => {
    return (
        <div>
            <Grid>{children}</Grid>
        </div>
    )
}

export default Layout
