import "./App.css";
import { BAR_CHART_DATA } from "./common/constants";
import ChartContainer from "./components/ChartContainer";

function App() {
  return (
    <main>
      <ChartContainer
        data={BAR_CHART_DATA}
        xAxisLabelText="Category"
        yAxisLabelText="Count"
      />
    </main>
  );
}

export default App;
