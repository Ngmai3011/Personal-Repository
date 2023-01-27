import { AiFillCaretDown } from "react-icons/ai";
import "./Dropdown.css";
import { useState, useEffect, useRef } from "react";

export const Dropdown = ({ children, items }) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const clickHandler = (documentRef) => {
      if (!dropdownRef.current.contains(documentRef.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="Dropdown"
    >
      {children}
      {items !== undefined && <AiFillCaretDown />}

      {isOpen === true && items !== undefined && (
        <div className="DropdownContent">
          <ul className="DropdownList">
            {items.map((item) => {
              return (
                <li key={item} className="DropdownItem">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
