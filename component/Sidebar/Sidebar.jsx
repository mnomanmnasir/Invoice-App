import React from 'react'
import Image from 'next/image';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_container">
                <div className="sidebar_header">
                    <div className="sidebar_logo">
                        <h2>Noman Coder's</h2>
                    </div>
                </div>
                <div className="sidebar_bottom">
                    <Image src='/next.svg' alt='avatar' width='50' height='50'/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;