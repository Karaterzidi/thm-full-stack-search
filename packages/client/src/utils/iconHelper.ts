// Mapping of types to their corresponding Font Awesome classes
const iconMapping = {
  hotels: "fa-building", // Icon for hotels
  countries: "fa-flag", // Icon for countries
  cities: "fa-globe", // Icon for cities
}

export type IconKeys = keyof typeof iconMapping

// Function to get the Font Awesome icon class based on the type
export const getIconClass = (type: IconKeys) => iconMapping[type]
