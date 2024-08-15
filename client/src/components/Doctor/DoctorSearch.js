import React, { useState, useEffect } from 'react';

const DoctorSearch=() =>
{
        const [ doctors, setDoctors ]=useState( [] );

        useEffect( () =>
        {
                fetch( '/api/doctors' )
                        .then( response => response.json() )
                        .then( data => setDoctors( data ) )
                        .catch( error => console.error( 'Error fetching doctors:', error ) );
        }, [] );

        return (
                <section className="doctor-search">
                        <h2>Search for Doctors</h2>
                        <div className="doctor-list">
                                { doctors.map( doctor => (
                                        <div key={ doctor.id } className="doctor-card">
                                                <h3>{ doctor.name }</h3>
                                                <p>{ doctor.specialization }</p>
                                        </div>
                                ) ) }
                        </div>
                </section>
        );
};

export default DoctorSearch;
