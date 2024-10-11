import React from "react";
import { Hotel, Country, City } from "../../types/models";
import { getIconClass, IconKeys } from "../../utils/iconHelper";
import { Link } from "react-router-dom";
import "./ResultItem.css";

// Defining a union type for the item prop that can be a Hotel, Country, or City
type Item = Hotel | Country | City;

// Defining the props for the ResultItem component
interface ResultItemProps {
  item: Item; // The item to display (Hotel, Country, or City)
  type: IconKeys; // The type of the item to determine rendering
}

// ResultItem component
const ResultItem: React.FC<ResultItemProps> = React.memo(({ item, type }) => {
  return (
    <li key={item._id}>
      <Link
        to={`/${type}/${item._id}`} // Dynamic routing based on type and item ID
        className="dropdown-item"
        tabIndex={0} // Makes the link focusable
        aria-label={`View details for ${type === "hotels"
          ? (item as Hotel).hotel_name
          : type === "countries"
            ? (item as Country).country
            : (item as City).name
          }`}
      >
        <i
          className={`fa ${getIconClass(type)} mr-2`} // Icon class based on item type
          aria-hidden="true" // Hides the icon from screen readers
          data-testid="icon-element" // Test ID for easier querying in tests
        ></i>
        {type === "hotels"
          ? (item as Hotel).hotel_name
          : type === "countries"
            ? (item as Country).country
            : (item as City).name}
      </Link>
      <hr className="divider" />
    </li>
  );
});

export default ResultItem; // Exporting the component for use in other files
