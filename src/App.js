import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Home from "./page/Home";

import "./assets/scss/style.scss"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
