import "./App.css";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getDatabase, ref, push } from "firebase/database";
import axios from "axios";

function App() {
  initializeApp(firebaseConfig);
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const addGoal = e => {
    e.preventDefault();
    const db = getDatabase();
    push(ref(db, "goals"), {
      goal
    });
    setGoal("");
  };

  const getGoals = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_FIREBASE_URL
    );
    setGoals(Object.keys(data).map(key => [key, data[key].goal]));
  };

  useEffect(() => {
    getGoals();
  }, [goal]);

  return (
    <div className="container mt-5 App">
      <h2>Goals App</h2>
      <form onSubmit={addGoal}>
        <div className="form-group mt-4">
          <textarea
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Enter your goal here..."
            className="form-control"
            id="goal"
            rows="2"
          ></textarea>
          <button type="submit" className="btn btn-primary mt-2">
            ADD
          </button>
        </div>
      </form>

      <ul className="list-group">
        {goals.map((goal, index) => (
          <li key={index} className="list-group-item">
            {goal[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export default App;
