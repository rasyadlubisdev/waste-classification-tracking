import { useState, useEffect } from "react";

const useGeolocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { latitude: "", longitude: "" }
    })

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: { latitude: location.coords.latitude, longitude: location.coords.longitude }
        });
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error
        })
    }
    
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation is not supported"
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return location
}

export default useGeolocation;