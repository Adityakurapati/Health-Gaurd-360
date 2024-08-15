import React, { useState, useEffect } from 'react';

const NewsUpdates=() =>
{
        const [ newsItems, setNewsItems ]=useState( [] );

        useEffect( () =>
        {
                fetch( '/api/news' )
                        .then( response => response.json() )
                        .then( data => setNewsItems( data ) )
                        .catch( error => console.error( 'Error fetching news:', error ) );
        }, [] );

        return (
                <section className="news-updates">
                        <h2>Latest News And Updates</h2>
                        <div className="news-carousel">
                                { newsItems.map( item => (
                                        <div key={ item.id } className="news-item">
                                                { item.title }
                                        </div>
                                ) ) }
                        </div>
                        <button className="prev-button">&lt;</button>
                        <button className="next-button">&gt;</button>
                </section>
        );
};

export default NewsUpdates;
