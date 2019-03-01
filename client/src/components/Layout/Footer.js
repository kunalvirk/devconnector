import React from 'react';

const Footer = () => {
    return (
        <div className="text-center mt-4 py-5 bg-dark text-light">
            &copy; Copyright. {new Date().getFullYear()} DevConnector
        </div>
    )
}

export default Footer;