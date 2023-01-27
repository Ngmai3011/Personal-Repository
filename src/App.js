import { Navigation } from "./Navigation";
import { Header } from "./Header";
import { Features } from "./Features";
import "./App.css";
import { Feedbacks } from "./Feedbacks";

export const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Header />
      <Features />
      <Feedbacks />
    </div>
  );
};
