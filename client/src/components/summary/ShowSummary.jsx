import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchShows } from '../../api';
import './Summary.css';

const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [formData, setFormData] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchShows().then((data) => {
      const selectedShow = data.find((item) => item.show.id === parseInt(id));
      if (selectedShow) {
        setShow(selectedShow.show);
      }
    });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('userDetails', JSON.stringify(formData));
  };

  return (
    <div className="container">
      <div className="header">
      {show && (
        <h1>{show.name}</h1> )}
      </div>
      {show && (
        <div className="show-summary">
          <div className="show-details">
            <h2>TV Show  : {show.name}</h2>
            <p className="summary-genre">Genre: {show.genres.join(', ')}</p>
            <p className="show-time">Runtime: {show.runtime} minutes</p>
            <p className="show-summary">{stripHtmlTags(show.summary)}</p>
          </div>
          <div className="show-image-container">
            <img
              src={show.image?.original || '/placeholder.png'}
              alt={show.name}
              className="show-image"
            />
          </div>
        </div>
      )}
      {!showBookingForm && show && (
        <button className="form-button" onClick={() => setShowBookingForm(true)}>
          Book this show
        </button>
      )}
      <br />
      {showBookingForm && show && (
        <div>
          <h2>Book This Show </h2>
          <form onSubmit={handleFormSubmit}>
          <label className="form-label">
            Show Name
            <input
              type="text"
              name="movieName"
              value={show.name}
              readOnly
              className="form-input"
            />
          </label>
          <label className="form-label">
            Your Name
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
          <button type="submit" className="form-button">Book Ticket</button>
        </form>
        </div>
      )}
      <Link to="/" className="back-link">Back to Show List</Link>
    </div>
  );
};

// Here we are just removing the HTML tags from the summary data
const stripHtmlTags = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

export default ShowSummary;
