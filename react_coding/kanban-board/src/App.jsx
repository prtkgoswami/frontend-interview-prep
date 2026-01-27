import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div id="root">
      <header>
        <h2>Kanban Board</h2>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
