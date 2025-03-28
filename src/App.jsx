import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

const API_SOURCES = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand"
};

const CATEGORY_NAMES = {
  p: "Prime Numbers",
  f: "Fibonacci Sequence",
  e: "Even Numbers",
  r: "Random Numbers"
};

const AUTH_URL = "http://20.244.56.144/test/auth";
const AUTH_BODY = {
    "companyName": "AffordMed",
    "clientID": "233261b3-8d0b-4d22-9f60-537204f1d022",
    "clientSecret": "GmOglHSfmwyUWpFa",
    "ownerName": "Rakesh Manubolu",
    "ownerEmail": "manubolurakesh@gmai.com",
    "rollNo": "22761A1238"
};

const App = () => {
  const { category } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApiKey = async () => {
    try {
      const response = await axios.post(AUTH_URL, AUTH_BODY);
      if (response.data && response.data.access_token) {
        return response.data.access_token;
      } else {
        throw new Error("Invalid API key response");
      }
    } catch (err) {
      console.error("Error fetching API key:", err);
      throw new Error("Failed to get API key");
    }
  };

  const fetchData = async (key) => {
    if (!category || !API_SOURCES[category]) {
      setError("Invalid category. Use /p, /f, /e, or /r.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(API_SOURCES[category], {
        headers: { Authorization: `Bearer ${key}` },
        timeout: 3000
      });

      setData(response.data.numbers || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchKeyAndData = async () => {
      try {
        const key = await fetchApiKey();
        fetchData(key);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchKeyAndData();
  }, [category]);

  return (
    <div className="container">
      <h1 className="title">Number Fetcher</h1>
      <h2 className="category">{CATEGORY_NAMES[category] || "Unknown Category"}</h2>

      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}

      {data && !loading && !error && (
        <div className="data-box">
          <h3>Numbers</h3>
          <div className="number-row">
            {data.map((num, index) => (
              <div key={index} className="number-card" onClick={() => alert(`Clicked: ${num}`)}>
                {num}
              </div>
            ))}
          </div>
          {data.length > 0 && (
            <h3>Average: {Math.round((data.reduce((a, b) => a + b, 0) / data.length) * 100) / 100}</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
