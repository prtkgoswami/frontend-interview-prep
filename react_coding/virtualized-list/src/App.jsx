import "./App.css";
import VirtualList from "./components/VirtualList";

function App() {
  const listItems = Array.from({ length: 120 }, (_, i) => `item-${i + 1}`);
  return (
    <div id="root">
      <header>
        <h2>Virtualized List</h2>
      </header>
      <main>
        <VirtualList
          dataItems={listItems}
          containerHeight={600}
          itemHeight={50}
        />
      </main>
    </div>
  );
}

export default App;
