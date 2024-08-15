import React, { useState } from 'react';
import './disease.css';

const AlphabetSearch=() =>
{
        const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' );
        const [ diseases, setDiseases ]=useState( [] );

        const fetchDiseasesByLetter=( letter ) =>
        {
                fetch( `/api/diseases/${ letter }` )
                        .then( response => response.json() )
                        .then( data =>
                        {
                                if ( Array.isArray( data ) )
                                {
                                        setDiseases( data );
                                } else
                                {
                                        console.error( 'Expected an array but got:', data );
                                        setDiseases( [] ); // Reset diseases if the data is not an array
                                }
                        } )
                        .catch( error =>
                        {
                                console.error( 'Error fetching diseases:', error );
                                setDiseases( [] ); // Reset diseases in case of an error
                        } );
        };

        return (
                <section className="alphabet-search">
                        <h2>Find diseases & conditions by first letter</h2>
                        <div className="letter-buttons">
                                { alphabet.map( letter => (
                                        <button
                                                key={ letter }
                                                className="letter-button"
                                                onClick={ () => fetchDiseasesByLetter( letter ) }
                                        >
                                                { letter }
                                        </button>
                                ) ) }
                        </div>
                        <ul>
                                { diseases.length===0? (
                                        <li>No diseases found.</li>
                                ):(
                                        diseases.map( disease => (
                                                <li key={ disease.id }>{ disease.name }</li>
                                        ) )
                                ) }
                        </ul>
                </section>
        );
};

export default AlphabetSearch;
