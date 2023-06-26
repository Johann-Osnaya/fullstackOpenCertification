import { useState, useEffect  } from "react";
import axios from "axios";
import Country from './components/Country.js'

function App() {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => 
    setCountries(response.data)
    )
  },[])

  const handleCountryChange = (event) => {
    setSearch(event.target.value)
  }

  const showCountries = search === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(search))
  if(showCountries === null) {
    return null
  }
  else {
    return (
      <div>
        find countries <input onChange={handleCountryChange} value={search} />
          <Country country={showCountries} setSearch={setSearch}/>
      </div>
    )
  }

}

export default App;
