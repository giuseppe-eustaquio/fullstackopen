import { useState, useEffect } from 'react';
import Countries from './components/Countries';
import countryService from './services/countries';

function App() {
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const initiateCountries = () => {
    countryService
      .getAll()
      .then((initialCountries) => setAllCountries(initialCountries));
  };
  useEffect(initiateCountries, []);

  const handleFilter = (e) => {
    if (e.target.value === '') {
      setCountriesToShow([]);
    } else {
      const tempCountries = allCountries.filter((country) =>
        country.name.common
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase())
      );
      setCountriesToShow(tempCountries);
    }
  };

  const handleShow = (countryName) => {
    setCountriesToShow(
      allCountries.filter(
        (country) =>
          country.name.common.toLowerCase() === countryName.toLowerCase()
      )
    );
    console.log(
      allCountries.find(
        (country) =>
          country.name.common.toLowerCase() === countryName.toLowerCase()
      )
    );
    const abc = document.getElementById('finder');

    abc.value = countryName;
  };
  return (
    <div>
      find countries
      <input onInput={handleFilter} id="finder"></input>
      <ul>
        <Countries country={countriesToShow} onClick={handleShow} />
      </ul>
    </div>
  );
}

export default App;
