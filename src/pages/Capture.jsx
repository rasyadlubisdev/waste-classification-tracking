import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'

export default function Capture() {
  const webcamRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(null)
  const navigate = useNavigate()

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImageSrc(imageSrc)
  }

  const handleSave = () => {
    localStorage.setItem('capturedImage', imageSrc)
    navigate('/result')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Capture Image</h1>
      {imageSrc ? (
        <div>
          <img src={imageSrc} alt="Captured" />
          <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
          />
          <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={capture}>
            Capture Photo
          </button>
        </div>
      )}
    </div>
  )
}