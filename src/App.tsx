import "./App.css";
import DataTables from "./components/Table/DataTables";
import { DATA } from "./data/constants";

function App() {
  // pass data's tables into DataTables
  return <DataTables data={DATA} />;
}

export default App;
