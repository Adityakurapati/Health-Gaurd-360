// src/components/AppointmentForm.js
import React, { useState } from 'react';
import './AppointmentForm.css';
import Modal from '../Modal/Modal';


function AppointmentForm ()
{
        const [ formData, setFormData ]=useState( {
                name: '',
                age: '',
                mobile: '',
                doctor: '',
                disease: '',
                date: '',
                time: ''
        } );

        const [ isModalOpen, setIsModalOpen ]=useState( false );
        const [ modalMessage, setModalMessage ]=useState( '' );

        const handleChange=( e ) =>
        {
                setFormData( {
                        ...formData,
                        [ e.target.name ]: e.target.value
                } );
        };

        const handleSubmit=( e ) =>
        {
                e.preventDefault();

                fetch( '/api/add-appointment', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( formData )
                } )
                        .then( response => response.json() )
                        .then( data =>
                        {
                                if ( data.success )
                                {
                                        setModalMessage( "Appointment booked successfully!" );
                                        setIsModalOpen( true );
                                } else
                                {
                                        setModalMessage( "Error booking appointment: "+data.error );
                                        setIsModalOpen( true );
                                }
                        } )
                        .catch( error =>
                        {
                                setModalMessage( "Error: "+error );
                                setIsModalOpen( true );
                        } );
        };

        const closeModal=() =>
        {
                setIsModalOpen( false );
        };

        return (
                <div className="appointment-form">
                        <h2>Book An Appointment</h2>
                        <form onSubmit={ handleSubmit }>
                                <input type="text" name="name" placeholder="Patient Name" required value={ formData.name } onChange={ handleChange } />
                                <input type="text" name="age" placeholder="Age" required value={ formData.age } onChange={ handleChange } />
                                <input type="text" name="mobile" placeholder="Mobile No." required value={ formData.mobile } onChange={ handleChange } />
                                <input type="text" name="doctor" placeholder="Select Doctor" required value={ formData.doctor } onChange={ handleChange } />
                                <input type="text" name="disease" placeholder="Mention Your Disease" required value={ formData.disease } onChange={ handleChange } />
                                <input type="date" name="date" required value={ formData.date } onChange={ handleChange } />
                                <input type="time" name="time" required value={ formData.time } onChange={ handleChange } />
                                <button type="submit">Appointment</button>
                                <button type="button">Doctors</button>
                        </form>

                        <Modal isOpen={ isModalOpen } onClose={ closeModal } message={ modalMessage } />
                </div>
        );
}

export default AppointmentForm;
