import Reactn from "react";
import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="London" />
        <footer className="mt-1">
          👌This website was coded by Tina Searchfield
          <a
            href="https://github.com/TinaGrace0810/weather-react-copy.git"
            target="_blank"
            rel="noreferrer"
            title="Source code on GitHub"
          >
            <strong> open-sourced</strong>
          </a>
        </footer>
      </div>
    </div>
  );
}
