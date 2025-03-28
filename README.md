# AffordMed Number Fetcher

A React-based application that fetches and displays numbers from different categories such as Prime Numbers, Fibonacci Sequence, Even Numbers, and Random Numbers using an external API.

## Features
- Fetches numbers from an API based on category.
- Categories include Prime, Fibonacci, Even, and Random numbers.
- Displays fetched numbers in a neatly styled UI.
- Calculates and displays the average of fetched numbers.
- Uses an authentication mechanism to retrieve a fresh API key each time.
- Smooth UI with animations and click effects.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/affordmed-number-fetcher.git
   ```
2. Navigate to the project folder:
   ```bash
   cd affordmed-number-fetcher
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The application will run on **http://localhost:3000**.

## API Usage
The application communicates with an external API to fetch data. Before fetching numbers, it retrieves an authentication token.

### Authentication API
**Endpoint:**
```http
POST http://20.244.56.144/test/auth
```
**Request Body:**
```json
{
  "companyName": "AffordMed",
  "clientID": "233261b3-8d0b-4d22-9f60-537204f1d022",
  "clientSecret": "GmOglHSfmwyUWpFa",
  "ownerName": "Rakesh Manubolu",
  "ownerEmail": "manubolurakesh@gmai.com",
  "rollNo": "22761A1238"
}
```

### Number Fetching APIs
- Prime Numbers: `GET http://20.244.56.144/test/primes`
- Fibonacci Sequence: `GET http://20.244.56.144/test/fibo`
- Even Numbers: `GET http://20.244.56.144/test/even`
- Random Numbers: `GET http://20.244.56.144/test/rand`

All requests must include an authentication token:
```http
Authorization: Bearer <access_token>
```

## Project Structure
```
📂 affordmed-number-fetcher
├── 📂 src
│   ├── 📜 App.js       # Main React component
│   ├── 📜 App.css      # Styles for the application
│   ├── 📜 index.js     # Entry point for React
├── 📜 package.json     # Dependencies and sc
