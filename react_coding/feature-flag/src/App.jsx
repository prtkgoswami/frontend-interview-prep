import { useEffect, useState } from "react";
import ComponentB from "./components/componentB";
import ComponentA from "./components/componentA";
import "./App.css";

function Selector({ showComponentB }) {
  if (showComponentB) {
    return <ComponentB />;
  }
  return <ComponentA />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showComponentBFlag, setShowComponentBFlag] = useState(false);

  useEffect(() => {
    const savedFeatureFlag = localStorage.getItem("show_component_b");
    if (savedFeatureFlag !== null) {
      setShowComponentBFlag(savedFeatureFlag === "true");
      setIsLoading(false);
    } else {
      const selectedValue = !!Math.round(Math.random());
      setShowComponentBFlag(selectedValue);
      localStorage.setItem("show_component_b", selectedValue);
      setIsLoading(false);
    }
  }, []);

  return (
    <main>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <Selector showComponentB={showComponentBFlag} />}
    </main>
  );
}

export default App;
