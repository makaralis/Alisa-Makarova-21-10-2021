import axios from "axios";
import { toast } from "react-toastify";


export const findMyCity = async (lat, ln) => {
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${lat}%2C%20${ln}`);
        
        return res.data;
    }
    catch (err) {
        toast.error('Error while getting a current location', toast.POSITION.BOTTOM_RIGHT);
    }
}