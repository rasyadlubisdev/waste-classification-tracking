import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = () => {
    const reader = new FileReader()
    reader.onloadend = () => {
      localStorage.setItem('uploadedImage', reader.result)
      navigate('/result')
    }
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div>
          <img src={preview} alt="Preview" className="mt-4 max-w-md" />
          <button
            className="bg-green-500 text-white px-4 py-2 mt-4"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}