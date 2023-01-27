import headerImage from "./HeaderImage.png";
import "./Header.css";
export const Header = () => {
  return (
    <header className="Header">
      <img className="HeaderImage" src={headerImage} />
      <div className="HeaderTexts">
        <h1 className="HeaderHeading"> Sending smiles, one gift at a time</h1>
        <p className="HeaderSubtitle">
          The all-in-one gifting platform helping organizations reward employees
          and customers with gifts that delight - every time.
        </p>
      </div>
    </header>
  );
};
