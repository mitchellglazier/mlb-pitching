import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  return (
    <div className="navbar-container">
        <Link href="/" className="navbar-logo">MLB</Link>
        <div className="navbar-links-container">
          <Link href="/about" className="navbar-link">About</Link>
        </div>
    </div>
  )
}

export default Navbar