import React from "react";
import { Hotel, Country, City } from "../../types/models";
import ResultItem from "../ResultItem/ResultItem";
import "./ResultList.css";
import { IconKeys } from "../../utils/iconHelper";

// Defining a union type for the items that can be hotels, countries, or cities
type Item = Hotel | Country | City;

// Defining the props for the ResultsList component
interface ResultsListProps {
  hotels: Hotel[]; // Array of hotels
  countries: Country[]; // Array of countries
  cities: City[]; // Array of cities
  showResults: boolean; // Flag to control visibility of results
  isLoading: boolean; // Flag to indicate loading state
  isError: boolean; // Flag to indicate error state
}

// ResultsList component
const ResultsListComponent: React.FC<ResultsListProps> = ({
  hotels,
  countries,
  cities,
  showResults,
  isLoading,
  isError,
}) => {
  // If no results should be shown, return null
  if (!showResults) return null;

  // If loading, display loading message
  if (isLoading) return <p>Loading...</p>;

  // If there's an error, display an error message
  if (isError) return <p>Error fetching data.</p>;

  // Function to render the list of items based on type
  const renderList = (items: Item[], type: IconKeys) => {
    // Check if there are items to display
    if (items.length) {
      return items.map((item) => (
        <ResultItem key={item._id} item={item} type={type} /> // Render each item using ResultItem
      ));
    }
    // If no items matched, show a message
    return (
      <div tabIndex={0} className="no-match-found">
        No {type.slice(0, -1)}s matched. Try a different search term.
      </div>
    );
  };

  return (
    <div
      className="search-dropdown-menu dropdown-menu w-100 show p-2" // Main container for dropdown menu
      aria-live="polite" // For accessibility: informs assistive technologies about updates
    >
      <h2>Hotels</h2>
      {renderList(hotels, "hotels")}
      <h2>Countries</h2>
      {renderList(countries, "countries")}
      <h2>Cities</h2>
      {renderList(cities, "cities")}
    </div>
  );
};

// Memoizing the component to prevent unnecessary re-renders
const ResultsList = React.memo(ResultsListComponent);
ResultsList.displayName = "ResultsList"; // Explicitly set the display name for React.memo

export default ResultsList; // Exporting the component for use in other files
