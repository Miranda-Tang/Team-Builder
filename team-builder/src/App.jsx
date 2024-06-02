import { BrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <header>Miranda&apos;s Team Builder</header>
        <Home />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
