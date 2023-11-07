/* eslint-disable react/prop-types */
const SingleCountry = ({ countryData }) => {
  return (
    <>
      <div style={{ border: "1px solid black" }}>
        <h3>Region:{countryData.region}</h3>
      </div>
    </>
  );
};

export default SingleCountry;
