import axios from "axios"

const instanse = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

export const geoDBRequest = (value: string) => instanse.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
    params: {
        namePrefix: value,
    },
    headers: {
        'X-RapidAPI-Key': 'b913052135msh6974cefaa6b13ecp1be65ejsn6c4bbab13dd6',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
})

