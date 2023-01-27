import {Dropdown} from "./Dropdown";
import "./Navigation.css";
import {useEffect, useState} from "react";

export const Items = () => {
  return (
    <div className="Items">
      <div className="Item">
        <Dropdown items={["About us", "Career", "News"]}>Company</Dropdown>
      </div>

      <div className="Item">
        <Dropdown items={["Research", "Blog"]}>Resources</Dropdown>
      </div>

      <div className="Item">
        <Dropdown>Contact us</Dropdown>
      </div>
    </div>
  );
};

const useNavigationColor = () => {
  const [navigationColor, setNavigationColor] = useState("#d9fbec");

  useEffect(() => {
    const scrollHandler = (scrollRef) => {
      if (scrollRef.target.scrollingElement.scrollTop >= 1384) {
        setNavigationColor("#d2f3ff");
      } else if (scrollRef.target.scrollingElement.scrollTop >= 660) {
        setNavigationColor("#f9ebd0");
      } else {
        setNavigationColor("#d9fbec");
      }
    };
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return {
    background: navigationColor,
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
  };
};

export const Navigation = () => {
  const style = useNavigationColor();

  return (
    <nav className="Navigation" style={style}>
      <div> SNAPPY </div>
      <Items />
      <div />
    </nav>
  );
};
