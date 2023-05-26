import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Example from "./components/Example";
import Ex2 from "./components/Ex2";

export default function App() {
  return (
    <>
      <Header />
      <Hero2 />
      {/* <Hero /> */}
      <Example />
      {/* <Ex2 /> */}
    </>
  );
}
