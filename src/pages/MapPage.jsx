import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import useGeolocation from '../hooks/useGeolocation'
import gpsFixedIcon from '../components/icons/gps-fixed.svg'

export default function MapPage() {
  const ZOOM_LEVEL = 20
  const mapRef = useRef()
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locations')) || []
    setLocations(savedLocations)
  }, [])

  const binsIcon = new Icon({
    iconUrl: require('../components/icons/marker-bins.png'),
    iconSize: [35, 49],
  })

  const userIcon = new Icon({
    iconUrl: require('../components/icons/marker-user.png'),
    iconSize: [49, 49],
  })

  const location = useGeolocation()

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.setView(
        [location.coordinates.latitude, location.coordinates.longitude],
        ZOOM_LEVEL,
        { animate: true }
      )
    } else if (location.error) {
      alert(location.message)
    } else {
      alert('Please wait, location is loading...')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Map</h1>
      <MapContainer
        ref={mapRef}
        center={[-7.280301604812306, 112.79531939931405]}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={true}
        style={{ height: '98vh' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {locations.map((loc, index) => (
            <Marker
              key={index}
              icon={binsIcon}
              position={[loc.latitude, loc.longitude]}
            >
              <Popup>Waste reported here.</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {location.loaded && !location.error && (
          <Marker
            position={[
              location.coordinates.latitude,
              location.coordinates.longitude,
            ]}
            icon={userIcon}
          ></Marker>
        )}
      </MapContainer>
      <button
        onClick={showMyLocation}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 30,
          zIndex: 1000,
          border: 'none',
          borderRadius: '10px',
          display: 'flex',
          padding: '6px',
          backgroundColor: '#019875',
          boxShadow: '0px 0px 32px 0px rgba(4,97,75,0.8)',
        }}
      >
        <img
          src={gpsFixedIcon}
          alt="fixed icon"
          style={{ width: 50, height: 50 }}
        />
      </button>
    </div>
  )
}