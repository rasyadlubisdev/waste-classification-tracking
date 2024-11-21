import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex">
        <Link className="text-white px-2" to="/">
          Home
        </Link>
        <Link className="text-white px-2" to="/map">
          Map
        </Link>
      </div>
    </nav>
  )
}