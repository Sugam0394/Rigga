


const countries = [
  {
    name: "United States",
    code: "+1",
  },
  {
    name: "United Kingdom",
    code: "+44",
  },
  {
    name: "India",
    code: "+91",
  },
];

const CountryCodeSelector = ({
  value,
  onChange,
}) => {
  return (
 <select
  id="country-code"
  value={value}
  onChange={onChange}
  style={{
    width: "100%",
    height: "48px",
    padding: "0 16px",
    border: "1px solid #D1D5DB",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    marginBottom: "12px",
  }}
>
      {countries.map((country) => (
        <option
          key={country.code}
          value={country.code}
        >
          {country.name} ({country.code})
        </option>
      ))}
    </select>
  );
};

export default CountryCodeSelector;

 

 