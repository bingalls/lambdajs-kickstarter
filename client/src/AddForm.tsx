import React, { useState, ChangeEvent } from "react";
import Axios from "axios";

function AddForm() {
  const initialState = { organizer: "", venue: "", date: "" };
  const [promos, setPromos] = useState(initialState);

  const url = "http://localhost:3010/";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPromos({ ...promos, [event.target.id]: value });
  };

  return (
    <form className="App-form">
      <h2>Add Event</h2>
      <label className="App-label" htmlFor="organizer">
        Organizer
      </label>
      <input
        className="App-input"
        id="organizer"
        max="30"
        min="2"
        pattern="[- a-zA-Z0-9]+"
        title="letters, numbers, dashes, spaces"
        type="text"
        value={promos.organizer}
        onChange={handleInputChange}
      />
      <br />

      <label className="App-label" htmlFor="venue">
        Venue
      </label>
      <input
        className="App-input"
        id="venue"
        max="30"
        min="2"
        pattern="[- a-zA-Z0-9]+"
        title="letters, numbers, dashes, spaces"
        type="text"
        value={promos.venue}
        onChange={handleInputChange}
      />
      <br />

      <label className="App-label" htmlFor="date">
        Date
      </label>
      <input
        className="App-input"
        id="date"
        type="date"
        value={promos.date}
        onChange={handleInputChange}
      />
      <br />

      <input
        className="App-btn"
        type="submit"
        value="Add"
        onClick={() => {
          Axios.post(url, promos)
            .then(function (response) {
              // console.log(response.data.body);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      />
    </form>
  );
}

export default AddForm;
