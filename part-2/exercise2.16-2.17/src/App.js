import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import phoneService from './services/phonebook'
import Notfification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [find, setFind] = useState('');
  const [message, setMessage] = useState('message')

  useEffect(() => {
    console.log('effect')
    phoneService.getAll().then(initial => {
        setPersons(initial)
      })
  }, [])

  const displayMessage = (message) => {
    setMessage(`${message}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removePerson = id => {
    phoneService.remove(id).then(
	  () => {
	    let newPersons = persons.filter((person) => person.id !== id)
	    console.log(newPersons)
      displayMessage(`This contact was succesfully removed`)
	    setPersons(newPersons)
    }).catch(error => {
      let newPersons = persons.filter((person) => person.id !== id)
      setPersons(newPersons) 
      displayMessage(`This contact was already removed`)
    })

}
  const changeDetails = (changeContact) =>{
    let changedContact = {...changeContact, number: newNumber}
    let newPersons = persons.filter((person) => person.id !== changedContact.id)
    phoneService.update(changedContact.id, changedContact).then(
      contact => setPersons(newPersons.concat(contact))
    )
    setNewName('')
    setNewNumber('')
    displayMessage(`${changeContact.name}'s phone number was changed`)
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
        displayMessage(`${newPerson.name} is already in the phone book`)
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
    displayMessage(`${newPerson.name} was succesfully added`)
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
	<Notfification message={message} />
	<Filter find = {find} HandleFindChange = {HandleFindChange}/> 
	<Form addContact = {addContact} newName = {newName} HandleNameChange = {HandleNameChange} newNumber = {newNumber} HandleNumberChange = {HandleNumberChange} />
	<Persons persons={personsToShow} removePerson = {removePerson}/>
    </div>
  );
};

export default App;
