import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
