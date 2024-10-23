import axios from 'axios'
import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import Form from './components/Form';
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [find, setFind] = useState('');

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


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
    if (names.includes(newName)){
      alert(newName + ' is already in the phonebook');
      return;
    }
    let newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
