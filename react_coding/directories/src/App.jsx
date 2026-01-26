import "./App.css";
import { directories } from "./assets/data";
import Folder from "./components/Folder";

function App() {
  return (
    <div id="app-wrapper">
      <nav>
        <ul id="directory-wrapper" role="tree">
          <Folder data={directories} />
        </ul>
      </nav>
      <main></main>
    </div>
  );
}

export default App;
