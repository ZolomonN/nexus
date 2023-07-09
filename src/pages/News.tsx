import Grid from "@mui/material/Unstable_Grid2/Grid2"
import React from "react"
import ComponentCard from "../component/ComponentCard"

const News: React.FC = () => {
    return <Grid container>
        {Array(12).fill(0).map(item => <Grid md={6} lg={4}><ComponentCard /></Grid>)}

    </Grid>
}

export default News