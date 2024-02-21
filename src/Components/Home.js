import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { AccordionButton } from 'react-bootstrap';

// Simple home page to say what this app is about

export default function Home() {

    return (
        <div className='HomeContainer'>
            <h2 className='HomeHeader'>Vehicle Maintenance Record</h2>
            <p className='HomeP'>Keep your vehicle records in one place.</p>
        </div>
    )
}