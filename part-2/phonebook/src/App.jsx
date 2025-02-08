import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Names from './components/Names';
import PersonForm from './components/PersonForm';
import axios from 'axios';
import personService from './services/persons';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification"> {message}</div>;
};

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error"> {message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);
  // const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsToShow(initialPersons);
    });
  };

  useEffect(hook, []);

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };
  const handleFilter = (e) => {
    setPersonsToShow(
      persons.filter((person) =>
        person.name.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
    );
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteOne(id).then((returnedPersons) => {
        setPersons(persons.filter((n) => n.id !== id));
        setPersonsToShow(personsToShow.filter((n) => n.id !== id));
      });
    }
  };

  const addName = (e) => {
    e.preventDefault();
    // const personExists = persons.some((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.getAll().then((personList) => {
      const personExists = personList.some((person) => person.name === newName);
      if (personExists) {
        if (
          window.confirm(
            `${newName} is already added to phonebook. Replace THE old number with a new one?`
          )
        ) {
          const filteredPerson = persons.filter(
            (person) => person.name === newName
          )[0];
          personService
            .update(filteredPerson.id, newPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id === filteredPerson.id ? returnedPerson : person
                )
              );
              setPersonsToShow(
                personsToShow.map((person) =>
                  person.id === filteredPerson.id ? returnedPerson : person
                )
              );
            })
            .catch(() => {
              setErrorMessage(`
          Information of ${newName} has already been removed from the server
          `);
            });
          setMessage(`Updated number for ${filteredPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
      } else {
        personService.create(newPerson).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson));
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      }
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
      <Filter onChange={handleFilter} />

      <form>
        <h3>add a new</h3>
        <PersonForm
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addName={addName}
        />
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Names
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default App;
