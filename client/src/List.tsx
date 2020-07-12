import React, { useEffect, useState } from "react";
import Axios from "axios";

/**
 * Table of Promotional Events read from database
 */
function List() {
  const [events, setPromos] = useState([
    { organizer: "missing data", venue: "click refresh", date: "2000-01-01" },
  ]);

  const url = "http://localhost:3010/";
  useEffect(() => {
    Axios.get(url)
      .then(function (response) {
        setPromos(response.data.body);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <table className="App-block">
        <thead>
          <tr>
            <th className="App-hcell">Organizer</th>
            <th className="App-hcell">Venue</th>
            <th className="App-hcell">Date</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(events).map((elem, idx) => (
            <tr key={idx}>
              <td className="App-cell">
                {events[parseInt(elem, 10)].organizer}
              </td>
              <td className="App-cell">{events[parseInt(elem, 10)].venue}</td>
              <td className="App-cell">
                {new Date(events[parseInt(elem, 10)].date).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="App-btn"
        onClick={() => {
          Axios.get(url)
            .then(function (response) {
              setPromos(response.data.body);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        Refresh / Read
      </button>
    </div>
  );
}

export default List;
