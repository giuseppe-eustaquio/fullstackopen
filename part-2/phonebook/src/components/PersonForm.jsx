const PersonForm = ({ handleNameChange, handleNumberChange, addName }) => {
  return (
    <div>
      <div>
        name: <input onChange={handleNameChange} />
      </div>

      <div>
        number: <input onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </div>
  );
};

export default PersonForm;
