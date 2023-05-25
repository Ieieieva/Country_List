import "./App.scss";
import { CountryList } from "./components/CountryList/CountryList";

const App = () => {
  return (
    <div className="App__container">
      <h1 className="App__heading">Country List</h1>
      <CountryList />
    </div>
  );
}

export default App;
