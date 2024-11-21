import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { predictImage, predictLargeImage } from '../utils/api'
import { predictImage } from '../utils/api'

export default function Result() {
  const [imageSrc, setImageSrc] = useState(null)
  const [predictResult, setPredictResult] = useState(null)
//   const [predictLargeResult, setPredictLargeResult] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const capturedImage = localStorage.getItem('capturedImage')
    const uploadedImage = localStorage.getItem('uploadedImage')

    let imageDataUrl = capturedImage || uploadedImage
    setImageSrc(imageDataUrl)

    if (imageDataUrl) {
      fetchPredictions(imageDataUrl)
    } else {
      navigate('/')
    }
  }, [navigate])

  const fetchPredictions = async (imageDataUrl) => {
    try {
      const res = await fetch(imageDataUrl)
      const blob = await res.blob()
      const imageFile = new File([blob], 'image.jpg', { type: 'image/jpeg' })

      const predictRes = await predictImage(imageFile)
      // const predictLargeRes = await predictLargeImage(imageFile)

      setPredictResult(predictRes)
      // setPredictLargeResult(predictLargeRes)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

  const handleSave = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords

        const savedLocations = JSON.parse(localStorage.getItem('locations')) || []
        savedLocations.push({ latitude, longitude })
        localStorage.setItem('locations', JSON.stringify(savedLocations))

        const counts = JSON.parse(localStorage.getItem('wasteCounts')) || {}
        const predictedClass = predictResult.predicted_class
        counts[predictedClass] = (counts[predictedClass] || 0) + 1
        localStorage.setItem('wasteCounts', JSON.stringify(counts))

        localStorage.removeItem('capturedImage')
        localStorage.removeItem('uploadedImage')

        navigate('/')
      })
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleRemove = () => {
    localStorage.removeItem('capturedImage')
    localStorage.removeItem('uploadedImage')
    navigate('/')
  }

  return (
    <div className="container mx-auto p-4">
      {predictResult && (
        <div>
          <h2 className="text-xl font-bold">Prediction: {predictResult.predicted_class}</h2>
          <p>Confidence: {predictResult.confidence}</p>
        </div>
      )}
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Result" className="my-4" />
          {/* Placeholder untuk bounding box jika menggunakan predictLargeResult */}
        </div>
      )}
      <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleSave}>
        Save
      </button>
      <button className="ml-4 bg-red-500 text-white px-4 py-2 mt-2" onClick={handleRemove}>
        Remove
      </button>
    </div>
  )
}