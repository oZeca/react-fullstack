import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [setBookName, setSetBookName] = useState<string>("");
  const [setReview, setSetReview] = useState<string>("");
  const [fetchData, setFetchData] = useState<Array<any>>([]);
  const [reviewUpdate, setReviewUpdate] = useState<string>("");

  useEffect(() => {
    axios.get("/api/get").then((response) => {
      setFetchData(response.data || []);
    });
  }, []);

  const submit = () => {
    axios.post("/api/insert", { setBookName, setReview }).then((response) => {
      axios.get("/api/get").then((response) => {
        setFetchData(response.data || []);
      });
    });
  };

  const deleteB = (id: string) => {
    if (window.confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`).then((response) => {
        axios.get("/api/get").then((response) => {
          setFetchData(response.data || []);
        });
      });
    }
  };

  const edit = (id: string) => {
    axios.put(`/api/update/${id}`, { reviewUpdate }).then((response) => {
      axios.get("/api/get").then((response) => {
        setFetchData(response.data || []);
      });
    });
  };

  const card = fetchData.map((val, key) => {
    return (
      <div style={{ width: "18rem" }} className="m-2" key={key}>
        <div>
          <h5>{val.book_name}</h5>
          <p>{val.book_review}</p>
          <input
            name="reviewUpdate"
            onChange={(e) => setReviewUpdate(e.target.value)}
            placeholder="Update Review"
          ></input>
          <button
            onClick={() => {
              edit(val.id);
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              deleteB(val.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  console.log("asd");

  return (
    <div className="App">
      <h1>Fullstack React Application</h1>
      <div className="form">
        <input
          name="setBookName"
          placeholder="EnterBook Name"
          onChange={(e) => setSetBookName(e.target.value)}
        />
        <input
          name="setReview"
          placeholder="Enter Review"
          onChange={(e) => setSetReview(e.target.value)}
        />
      </div>
      <button onClick={submit}>Submit</button> <br />
      <br />
      <div style={{ display: "flex" }}>
        <div>{card}</div>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
