import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchShows } from '../../api';
import './List.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows().then((data) => setShows(data));
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>TV Shows</h1>
      </div>
      <div className="show-list">
        {shows.map((show) => (
          <div key={show.show.id} className="show-card">
            <img
              src={show.show.image?.original || '/placeholder.png'}
              alt={show.show.name}
              className="show-image"
            />
            <div className="show-details">
              <h2 className="show-name">{show.show.name}</h2>
              <p className="show-genre">{show.show.genres.join(', ')}</p>
              <Link to={`/summary/${show.show.id}`} className="button-container">
                <button className="form-button">View Summary</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
