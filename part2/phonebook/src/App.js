import {React, useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ matchingPersons, setMatchingPersons ] = useState(persons)
  const [ message, setMessage ] = useState({message: null, success: false})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setMatchingPersons(initialPersons)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find(person => person.name.toLowerCase().indexOf(newName.toLowerCase()) >= 0)
    if(existingPerson) { // person already in phonebook
      if(window.confirm(`${newName} has already been added to the phonebook. Replace old number with new one?`)) {
        personService
          .update(existingPerson.id, {name: newName, number: newNumber})
          .then(returnedPerson => {
            let newPersons = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)
            setPersons(newPersons)
            setMatchingPersons(newPersons)
            setNewName('')
            setNewNumber('')
            setMessage({
              message: `${returnedPerson.name} successfully added`, 
              success: true
            })
          })
          .catch(error => {
            setMessage({
                message: `${existingPerson.name} has already been deleted from the server`,
                success: false
            })
            setTimeout(() => {
              setMessage({message: null, success: false})
            }, 5000)
            let newPersons = persons.filter(person => person.id !== existingPerson.id)
            setPersons(newPersons)
            setMatchingPersons(newPersons)
          })
      }
    }
    else { // new person
      let newPersons = {name: newName, number: newNumber}
      personService
        .create(newPersons)
        .then(returnedPerson => {
          let newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
          setMatchingPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setMessage({
            message: `${returnedPerson.name} successfully added`, 
            success: true
          })
        })
    }
  }

  const removePerson = (id) => {
    if(window.confirm('Do you really want to remove this person from your phonebook?')) {
      personService.remove(id)
      let newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
      setMatchingPersons(newPersons)
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
      <Notification message={message.message} success={message.success} />
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
      {matchingPersons.map(person => 
        <Person key={person.id} person={person} remove={() => removePerson(person.id)} />
      )}
    </div>
  )
}
  
export default App