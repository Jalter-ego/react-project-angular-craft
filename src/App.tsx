import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Figma from "./pages/Figma";
import Image from "./pages/Image";
import HomeFigma from "./pages/HomeFigma";
import Layout from "./layout";
import Login from "./componets/auth/Login";
import Register from "./componets/auth/Register";
import Diagram from "./pages/Diagram";
import CodeBlitz from "./pages/CodeBlitz";



export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/figma" element={<HomeFigma />} />
        <Route path="/figma/:id" element={<Figma />} />
        <Route path="/image" element={<Image />} />
        <Route path="/diagram" element={<Diagram />} />
        <Route path="/code-blitz" element={<CodeBlitz />} />
      </Route>

      <Route path="/auth/login" element={<Login/>}/>
      <Route path="/auth/register" element={<Register/>}/>

    </Routes>
  )
}