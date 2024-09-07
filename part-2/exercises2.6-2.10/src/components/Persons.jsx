import Person from './Person';
const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(contact => (
          <Person key={contact.id} person={contact} />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
