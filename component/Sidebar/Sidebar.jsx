import React from 'react'
import Image from 'next/image';
import { FaBeer } from "react-icons/fa";
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaHospitalUser } from 'react-icons/fa'
import { FaServicestack } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { FaBuffer } from 'react-icons/fa'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_container">
                <div className="sidebar_header">
                     <div className="sidebar_logo">
                        <h2>Noman</h2>
                    </div>
                </div>
                <div className="icon-container">
                    <FaHome />
                    <div style={{ padding: '10%' }}>
                        <FaBuffer />
                    </div>
                    <div style={{ padding: '10%' }}>
                        <FaHospitalUser />
                    </div>
                    <div style={{ padding: '10%' }}>
                        <FaBeer />
                    </div>
                    <div style={{ padding: '10%' }}>
                        <FaServicestack />
                    </div>
                </div>
                <div className="sidebar_bottom">
                    <Image src='/logo.jpg' alt='avatar' width='50' height='50' />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;