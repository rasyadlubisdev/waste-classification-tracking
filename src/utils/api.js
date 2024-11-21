export const predictImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)
  
    const response = await fetch('https://fldqzq-7860.csb.app/predict/', {
      method: 'POST',
      body: formData,
    })
  
    return response.json()
  }
  
  export const predictLargeImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('file', imageFile)
  
    const response = await fetch('https://fldqzq-7860.csb.app/predict-large/', {
      method: 'POST',
      body: formData,
    })
  
    return response.json()
  }