export const jobTypes = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" }
];

export const jobLocations = [
  { value: "amsterdam_netherlands", label: "Amsterdam, Netherlands" },
  { value: "beijing_china", label: "Beijing, China" },
  { value: "berlin_germany", label: "Berlin, Germany" },
  { value: "brasilia_brazil", label: "Brasília, Brazil" },
  { value: "buenos_aires_argentina", label: "Buenos Aires, Argentina" },
  { value: "dublin_ireland", label: "Dublin, Ireland" },
  { value: "jakarta_indonesia", label: "Jakarta, Indonesia" },
  { value: "london_uk", label: "London, UK" },
  { value: "mexico_city_mexico", label: "Mexico City, Mexico" },
  { value: "new_delhi_india", label: "New Delhi, India" },
  { value: "ottawa_canada", label: "Ottawa, Canada" },
  { value: "paris_france", label: "Paris, France" },
  { value: "singapore_singapore", label: "Singapore, Singapore" },
  { value: "tokyo_japan", label: "Tokyo, Japan" },
  { value: "washington_dc_usa", label: "Washington DC, USA" }
].sort((a, b) => a.label.localeCompare(b.label));
