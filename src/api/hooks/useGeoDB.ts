import { useQuery } from "react-query"
import { geoDBRequest } from ".."
import { toast } from 'react-toastify';

const useGeoDB = (value: string) => {
    const key = ["GeoDB", value]
    const request = () => geoDBRequest(value)
    const options = {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 3600000,
        enabled: value.length > 3,
        select: (data: {
            data: {
                data: Array<{
                    city: string,
                    country: string,
                    countryCode: string,
                    latitude: number,
                    longitude: number,
                    population: number,
                    region: string
                }>
            }
        }) => data.data,
        onError: (error: any) => toast.error(error.message),
    }
    const { data, isFetching } = useQuery(key, request, options)
    return { data, isFetching }
}

export default useGeoDB