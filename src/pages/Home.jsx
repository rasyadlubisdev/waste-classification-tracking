import { useState, useEffect } from 'react'

export default function Home() {
  const wasteTypes = [
    'Cardboard',
    'Glass',
    'Metal',
    'Paper',
    'Plastic',
    'Textile Trash',
  ]
  const [counts, setCounts] = useState({})

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem('wasteCounts')) || {}
    setCounts(storedCounts)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Waste Classification</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Waste Type</th>
            <th className="py-2 px-4 border">Count</th>
          </tr>
        </thead>
        <tbody>
          {wasteTypes.map((type) => (
            <tr key={type}>
              <td className="border px-4 py-2">{type}</td>
              <td className="border px-4 py-2">{counts[type] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <a href="/capture" className="bg-blue-500 text-white px-4 py-2 mr-2">
          Capture Image
        </a>
        <a href="/upload" className="bg-green-500 text-white px-4 py-2">
          Upload Image
        </a>
      </div>
    </div>
  )
}