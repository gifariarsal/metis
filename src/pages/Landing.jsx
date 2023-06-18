import React from 'react'
import Navbar from '../components/NavbarUser'
import NavbarNonUser from '../components/NavbarNonUser'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div>
        <NavbarNonUser />
        {/* <Navbar /> */}
        <Footer />
    </div>
  )
}

export default Landing