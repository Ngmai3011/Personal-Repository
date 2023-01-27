import "./Card.css";

export const Card = ({ children, icon }) => {
  return (
    <div className="Card">
      <div className="CardIcon">{icon}</div>
      <div className="CardText"> {children} </div>
    </div>
  );
};
