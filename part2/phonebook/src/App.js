import {React, useState} from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ matchingPersons, setMatchingPersons ] = useState(persons)

  const addPerson = (e) => {
    e.preventDefault()
    if(persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) >= 0)
      alert(`${newName} has already been added to the phonebook`)
    else {
      let newPersons = persons.concat({name: newName, number: newNumber})
      setPersons(newPersons)
      setMatchingPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  const searchPhonebook = (e) => {
    let query = e.target.value.toLowerCase()
    if(!query) // empty
      setMatchingPersons(persons)
    else
      setMatchingPersons(persons.filter(person => person.name.toLowerCase().indexOf(query) === 0))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='Search for a person: ' onChange={searchPhonebook} />
      <h2>Add a new number</h2>
      <PersonsForm 
        inputs={[
          {
            text: 'name: ',
            value: newName,
            onChange: (e) => setNewName(e.target.value)
          },
          {
            text: 'number: ',
            value: newNumber,
            onChange: (e) => setNewNumber(e.target.value)
          }
        ]} 
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Numbers persons={matchingPersons} />
    </div>
  )
}
  
  export default App