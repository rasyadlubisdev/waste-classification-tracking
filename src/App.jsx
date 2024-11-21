import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import Capture from './pages/Capture'
import Result from './pages/Result'
import Upload from './pages/Upload'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/result" element={<Result />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  )
}
