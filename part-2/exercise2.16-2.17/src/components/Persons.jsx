import Person from './Person';
const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(contact => (
          <Person key={contact.id} person={contact} removePerson={() => removePerson(contact.id)}/>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
