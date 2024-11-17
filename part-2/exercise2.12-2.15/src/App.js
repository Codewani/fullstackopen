import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import phoneService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [find, setFind] = useState('');

  useEffect(() => {
    console.log('effect')
    phoneService.getAll().then(initial => {
        setPersons(initial)
      })
  }, [])

  const removePerson = id => {
    phoneService.remove(id).then(
	  () => {
	    let newPersons = persons.filter((person) => person.id !== id)
	    console.log(newPersons)
	    setPersons(newPersons)
    }).catch(error => alert("Contact not found"))
}
  const changeDetails = (changeContact) =>{
    let changedContact = {...changeContact, number: newNumber}
    let newPersons = persons.filter((person) => person.id !== changedContact.id)
    phoneService.update(changedContact.id, changedContact).then(
      contact => setPersons(newPersons.concat(contact))
    )
    setNewName('')
    setNewNumber('')
  }
  const HandleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const HandleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const HandleFindChange = (event) => {
    console.log(event.target.value);
    setFind(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault()
    let findPerson = persons.filter(person => person.name === newName)
    if (findPerson.length === 1){
      if (findPerson[0].number != newNumber) {
        return changeDetails(findPerson[0])
      }
      else{
        alert(newName + ' is already in the phonebook');
      }
      return;
    }
    let newPerson = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    };
    phoneService.create(newPerson).then(newPerson => {
      setPersons(persons.concat(newPerson))})	   
    setNewName('')
    setNewNumber('')
    console.log(persons);
  };
  const match = (input, person) => {
    if (input.length === 0){
      return true
    } 
    if (input.length > person.length){
      return false
    }
    let range = input.length
    for(let i = 0; i < range; i++){
      if (input[i].toLowerCase() !== person[i].toLowerCase()){
        return false
      }
    }
    return true
  }

  let personsToShow = persons.filter((person) => match(find, person.name))
  let names = persons.map(person => person.name)
  console.log(names)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter find = {find} HandleFindChange = {HandleFindChange}/> 
      <Form addContact = {addContact} newName = {newName} HandleNameChange = {HandleNameChange} newNumber = {newNumber} HandleNumberChange = {HandleNumberChange} />
      <Persons persons={personsToShow} removePerson = {removePerson}/>
    </div>
  );
};

export default App;
