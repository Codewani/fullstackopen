const Form = ({
  addContact,
  newName,
  HandleNameChange,
  newNumber,
  HandleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={HandleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={HandleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
