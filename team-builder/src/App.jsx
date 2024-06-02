import { Provider } from "react-redux";
import store from "./store";
import MemberForm from "./MemberForm.jsx";
import CardDisplay from "./CardDisplay.jsx";

function App() {
  return (
    <Provider store={store}>
      <header>Miranda&apos;s Team Builder</header>
      <div id="main_container">
        <MemberForm />
        <CardDisplay />
      </div>
    </Provider>
  );
}

export default App;
