
import {  Card, CardActions, CardContent, CircularProgress, IconButton, TextField, Typography, useTheme } from "@mui/material"
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import useGeoDB from "../api/hooks/useGeoDB"
import { Visibility } from "@mui/icons-material"
import { isEqual } from "lodash"

type CardT = {
    city: string,
    country: string,
    countryCode: string,
    latitude: number,
    longitude: number,
    population: number,
    region: string
}

const CityCard: React.FC<CardT & {isActiveCard: boolean, setMapPoint: (lat: number, long: number) => void}> = (
    { city, country, countryCode, latitude, longitude, population, region, isActiveCard,  setMapPoint }
    ) => {
        const theme = useTheme()
    return <Grid xs={12} sx={{
        "&:not(:last-child)": {
            marginBottom: "1rem"
        }
    }}>
        <Card sx={{
            backgroundColor: isActiveCard ?  theme.palette.primary.main : "unset",
            color: isActiveCard ?  theme.palette.primary.contrastText : "unset",
        }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{city}</Typography>
                <Typography variant="body2" color="text.secondary">Region: {region}</Typography>
                <Typography variant="body2" color="text.secondary">Country: {country} ({countryCode})</Typography>
                <Typography variant="body2" color="text.secondary">Population: {population}</Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="delete" onClick={() => setMapPoint(latitude, longitude)}>
                    <Visibility />
                </IconButton>
            </CardActions>
        </Card>
    </Grid>
}
const Addresses: React.FC = () => {
    const theme = useTheme()
    const [inputValue, setInputValue] = React.useState('');
    const [debouncedValue, setDebouncedValue] = useState("");
    const [currentMapPoint, setCurrentMapPoint] = useState<Array<number>>([55.75, 37.57])
    const setMapPoint = useCallback((lat: number, long: number) => setCurrentMapPoint([lat, long]), [])
    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, 1000)
        return () => clearTimeout(id)
    }, [inputValue])

    const { data, isFetching } = useGeoDB(debouncedValue)
    const isValidResult = Array.isArray(data?.data) && data?.data.length
    const mapPoints = useMemo(() => {
        if (isValidResult) {
            return data.data.map((item: any) => [item.latitude, item.longitude])
        }
        return []
    }, [data, isValidResult])
    useEffect(() => {
        if (mapPoints.length) {
            setCurrentMapPoint(mapPoints[0])
        }
    }, [mapPoints])
    return <Grid container spacing={2} sx={{
        marginTop: "3rem",
        height: "600px"
    }}>
        <Grid container xs={8} direction="column" sx={{
            height: "100%",
            flexWrap: "nowrap",
        
        }}>
            <Grid xs={12} marginBottom="1rem">
                <TextField variant="outlined" value={inputValue} onChange={event => setInputValue(event.target.value)} fullWidth />
            </Grid>
            <Grid container xs={12} sx={{
                flexGrow: 1,
                overflow: "auto",
                width: "100%",
                justifyContent: isValidResult ? "unset" : "center",
                alignItems: isValidResult ? "unset" : "center",
                color: theme.palette.text.primary
            }}>
                {isFetching ? <CircularProgress /> : 
                Array.isArray(data?.data) ? data?.data.length ? data.data.map((item: CardT) => 
                <CityCard {...item} isActiveCard={isEqual(currentMapPoint, [item.latitude, item.longitude])} setMapPoint={setMapPoint} />
                ) : "No results" : "Try find"}
            </Grid>
        </Grid>
        <Grid xs={4} sx={{
            borderRadius: "0.625rem"
        }}>
            <YMaps>
                <Map state={{ center: currentMapPoint, zoom: 9 }}
                    width="100%" height={"100%"}>
                        {mapPoints.map(coord =>  <Placemark geometry={coord} />)}
                   
                </Map>
            </YMaps>
        </Grid>
    </Grid>
}

export default Addresses