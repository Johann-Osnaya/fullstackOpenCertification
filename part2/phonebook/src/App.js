import { useState, useEffect } from 'react'
import personsServices from './services/persons.js'
import Numbers from './components/Numbers.js'
import Notification from './components/Notificaction.js'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  
  useEffect(()=> {
    personsServices
    .getAll()
    .then(initialPersons =>
      setPersons(initialPersons))
  }, [message])

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const addName = (event) => {
  event.preventDefault()
  const phoneObject = {
    name: newName,
    number: newNumber
  }
  persons.filter(person => person.name === newName).length > 0 
  ? window.confirm(`${newName} is already added to the phonebook, replace the old number with new one?`) ? updateContact(newName) : console.log('Canceled')
  : sendPerson(phoneObject) 
  setNewName('')
  setNewNumber('')
}

const nameFilter = (event) => {
  setSearch(event.target.value)
}

const sendPerson = phoneObject => {
  personsServices
  .create(phoneObject)
  .then(returnedPerson => 
    setPersons(persons.concat(returnedPerson)))
    setType('Green')
    setMessage(`Added ${phoneObject.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
}

const deleteContact = (id, name) => {
  const answer = window.confirm(`Delete ${name}?`)
  answer ? personsServices
  .eliminate(id)
  .then(personsServices
    .getAll()
    .then(personsInServer => setPersons(personsInServer)))
    .catch(error => {
      setType('Red')
      setMessage(`Information of ${name} has already been removed from server`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }) : console.log("Operation canceled")
}

const updateContact = (search) => {
  const contactObject = persons.find(person => person.name === search)
  console.log(contactObject)
  console.log(newNumber)
  console.log(contactObject.id)
  personsServices
  .update(contactObject.id, {...contactObject, number: newNumber})
  .then(updatedContacts => 
    setPersons(persons.map(person => 
      person.id !== contactObject.id 
      ? person 
      : updatedContacts)))
      .catch(error => {
        setType('Red')
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        },5000)
      })
}

const showNames = search === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(search))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={type} message={message} />
      <div>
      Filter: <input onChange={nameFilter} value={search} />
      </div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {showNames.map(person => 
          <Numbers key={person.id} name={person.name} number={person.number} deleteContact={() => deleteContact(person.id, person.name)}/>
          )}
    </div>
  )
}

export default App