import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <header></header>
        <Routes>
          {/*<Route path="/" element={<SearchParams />} />*/}
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
