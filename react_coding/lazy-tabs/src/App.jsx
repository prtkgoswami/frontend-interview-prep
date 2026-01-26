import React from "react";
import "./App.css";
import { useState, lazy, Suspense } from "react";
const Tab1 = lazy(() => import("./components/Tab1"));
const Tab2 = lazy(() => import("./components/Tab2"));
const Tab3 = lazy(() => import("./components/Tab3"));

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (event) => {
    const target = event.target;
    const targetTabLabel = target.dataset.tabLabel;

    if (targetTabLabel) setActiveTab(targetTabLabel);
  };

  return (
    <main>
      <div id="tabs-wrapper">
        <div id="tabs-container" role="tablist" onClick={handleTabClick}>
          <button
            className={`tab ${activeTab === "tab1" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "tab1"}
            data-testid="tab-1"
            data-tab-label="tab1"
          >
            Tab 1
          </button>
          <button
            className={`tab ${activeTab === "tab2" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "tab2"}
            data-testid="tab-2"
            data-tab-label="tab2"
          >
            Tab 2
          </button>
          <button
            className={`tab ${activeTab === "tab3" ? "active" : ""}`}
            role="tab"
            aria-selected={activeTab === "tab3"}
            data-testid="tab-3"
            data-tab-label="tab3"
          >
            Tab 3
          </button>
        </div>
        <div id="tab-content-container" data-testid="tab-content">
          <Suspense fallback={<h2>Loading...</h2>}>
            {activeTab === "tab1" && <Tab1 />}
            {activeTab === "tab2" && <Tab2 />}
            {activeTab === "tab3" && <Tab3 />}
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default App;
