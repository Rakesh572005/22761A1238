import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

// API Endpoints Mapping
const API_ENDPOINTS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand"
};

// Labels for Categories
const CATEGORY_LABELS = {
  p: "Prime Numbers",
  f: "Fibonacci Sequence",
  e: "Even Numbers",
  r: "Random Numbers"
};

// Authentication Details
const AUTH_API = "http://20.244.56.144/test/auth";
const AUTH_CREDENTIALS = {
  companyName: "AffordMed",
  clientID: "233261b3-8d0b-4d22-9f60-537204f1d022",
  clientSecret: "GmOglHSfmwyUWpFa",
  ownerName: "Rakesh Manubolu",
  ownerEmail: "manubolurakesh@gmai.com",
  rollNo: "22761A1238"
};

const App = () => {
  const { category } = useParams();
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Retrieve API Key
  const retrieveApiKey = async () => {
    try {
      const response = await axios.post(AUTH_API, AUTH_CREDENTIALS);
      return response.data?.access_token || "";
    } catch (error) {
      console.error("Error retrieving API key:", error);
      throw new Error("Unable to obtain API key");
    }
  };

  // Fetch numbers from API
  const fetchNumbers = async (apiKey) => {
    if (!category || !API_ENDPOINTS[category]) {
      setError("Invalid category. Please use /p, /f, /e, or /r.");
      return;
    }

    setLoading(true);
    setError("");
    setNumbers([]);

    try {
      const response = await axios.get(API_ENDPOINTS[category], {
        headers: { Authorization: `Bearer ${apiKey}` },
        timeout: 3000
      });

      setNumbers(response.data.numbers || []);
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setError("Failed to retrieve data. Please check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = await retrieveApiKey();
        await fetchNumbers(apiKey);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="container">
      <h1 className="title">Afford's Med Calculator</h1>
      <h2 className="category">{CATEGORY_LABELS[category] || "Unknown Category"}</h2>

      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && numbers.length > 0 && (
        <div className="data-box">
          <h3>Numbers</h3>
          <div className="number-row">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="number-card"
                onClick={() => alert(`Clicked: ${num}`)}
              >
                {num}
              </div>
            ))}
          </div>
          <h3>Average: {Math.round((numbers.reduce((a, b) => a + b, 0) / numbers.length) * 100) / 100}</h3>
        </div>
      )}
    </div>
  );
};

export default App;