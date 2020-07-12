import React from "react";
import AddForm from "./AddForm";
import List from "./List";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Ride-and-Drive Event Database!</h1>
        <p>Here are the events in the database:</p>
      </header>

      <List />

      <AddForm />
    </div>
  );
}

export default App;
