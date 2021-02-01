import React from 'react'

const Person = ({person}) => (
  <p>{person.name} {person.number}</p>
)

const Numbers = ({persons}) => (
  persons.map(person => 
    <Person key={person.name} person={person} />
  )
)

export default Numbers