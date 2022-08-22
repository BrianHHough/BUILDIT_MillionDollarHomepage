import logo from './logo.svg';
import './App.css';

// Components
import Grid from "./pages/grid"

// Routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// AWS
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Grid />} />
      </Routes>
    </Router>
  );
}

export default App;
