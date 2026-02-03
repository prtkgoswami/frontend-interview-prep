import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Info from "./pages/Info/Info";
import About from "./pages/About";
import UsersInfo from "./pages/Info/UsersInfo/UsersInfo";
import ItemsInfo from "./pages/Info/ItemsInfo";
import InfoLayout from "./pages/Info/InfoLayout";
import UsersInfoLayout from "./pages/Info/UsersInfo/UsersInfoLayout";
import UserDetails from "./pages/Info/UsersInfo/UserDetails";
import PageWrapper from "./components/PageWrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<InfoLayout />}>
              <Route index element={<Info />} />
              <Route path="users" element={<UsersInfoLayout />}>
                <Route index element={<UsersInfo />} />
                <Route path=":userId" element={<UserDetails />} />
              </Route>
              <Route path="items" element={<ItemsInfo />} />
            </Route>
            <Route path="/about" element={<About />} />
          </Routes>
        </PageWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
