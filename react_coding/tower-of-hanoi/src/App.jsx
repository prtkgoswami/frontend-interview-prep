import "./App.css";
import Canvas from "./components/Canvas";

const RINGS = [
  { width: 280, color: "red" },
  { width: 120, color: "purple" },
  { width: 180, color: "limegreen" },
  { width: 240, color: "orange" },
  { width: 350, color: "blue" },
];

function App() {
  const initialState = {
    tower1: [
      ...RINGS.sort((a, b) => b.width - a.width).map((data) => ({
        ...data,
        id: `${data.color}-${data.width}`,
      })),
    ],
    tower2: [],
  };
  return (
    <main>
      <Canvas initialState={initialState} />
    </main>
  );
}

export default App;
