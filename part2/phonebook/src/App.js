import React, { useState } from 'react'
import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    for (let i of persons) {
      if (i.name === newName) {
        alert(`${newName} is already added to the phonebook.`)
        setNewName('')
        return
      }
    }
    
    setPersons(persons.concat(personObject))
    setFilteredNames(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterNames = (event) => {
    event.target.value ?
    setFilteredNames(persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase()))) :
    setFilteredNames(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterNames} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {filteredNames.map((person) =>
          <Contact key={person.id} person={person} />
        )}
      </div>
    </div>
  )
}

export default App;
