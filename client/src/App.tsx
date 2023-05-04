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
      setFetchData(response.data);
    });
  }, []);

  const submit = () => {
    axios.post("/api/insert", { setBookName, setReview }).then(() => {
      alert("success post");
    });
    console.log({ setBookName, setReview });
  };

  const deleteB = (id: string) => {
    if (window.confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`);
    }
  };

  const edit = (id: string) => {
    axios.put(`/api/update/${id}`, { reviewUpdate });
  };

  const card = fetchData.map((val, key) => {
    return (
      <>
        <div style={{ width: "18rem" }} className="m-2">
          <div>
            <div>{val.book_name}</div>
            <div>{val.book_review}</div>
            <input
              name="reviewUpdate"
              onChange={(e) => setReviewUpdate(e.target.value)}
              placeholder="Update Review"
            ></input>
            <div
              className="m-2"
              onClick={() => {
                edit(val.id);
              }}
            >
              Update
            </div>
            <div
              onClick={() => {
                deleteB(val.id);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="App">
      <h1>Dockerized Fullstack React Application</h1>
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
      <div>
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
