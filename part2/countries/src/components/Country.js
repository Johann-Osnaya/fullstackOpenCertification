const Country = ({country, setSearch}) =>{
    if(country.length === 250){
        return null
    }
    else if (country.length === 1) {
        return (
            <div>
                <h1>{country[0].name.common}</h1>
                <p>capital {country[0].capital}</p>
                <p>area {country[0].area}</p>
                <ul>
                    {Object.values(country[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country[0].flags.png} width={150} />
            </div>
        )
    }
    else if( country.length < 10)
    {
        return (
            <ul>
                {country.map(country => {
                    return(
                        <>
                <li key={country.name.common}>{country.name.common}</li>
                <button key={country} onClick={() => setSearch(country.name.common.toLowerCase())}>{country.show ? 'Show less' : 'show'}</button>
                </>
                )}
            )}
            </ul>
        )
    }
    else{
        return (<p>Too many matches, specify another filter</p>)
    }

} 

export default Country