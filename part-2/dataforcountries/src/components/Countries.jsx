import Weather from './Weather';
import axios from 'axios';

const Countries = ({ country, onClick }) => {
  console.log('start of Countries', country, ' ', country.length);
  if (country.length > 10) {
    return <li>Too many matches, specify another filter</li>;
  } else if (country.length > 1) {
    console.log(country);
    return (
      <>
        {country.map((c) => (
          <li key={c.name.common}>
            {c.name.common}
            <button onClick={() => onClick(c.name.common)} key={c.name.common}>
              show
            </button>
          </li>
        ))}
      </>
    );
  } else if (country.length === 1) {
    const [objCountry] = country;
    console.log('it gets here');
    const languageList = [];
    for (const [key, value] of Object.entries(objCountry.languages)) {
      languageList.push(value);
    }
    return (
      <div>
        <p>Capital: {objCountry.capital[0]}</p>
        <p>Area: {objCountry.area}</p>
        <h3>Languages</h3>
        <ul>
          {languageList.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={objCountry.flags.png} />
        <Weather capital={objCountry.capital[0]} />
      </div>
    );
  }
};

export default Countries;
