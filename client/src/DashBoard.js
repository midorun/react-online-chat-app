import React from 'react'
import SideBar from './SideBar'

const DashBoard = ({ id }) => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
    </div>
  )
}

export default DashBoard
