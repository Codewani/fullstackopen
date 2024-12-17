import { useState, useEffect } from 'react'
import Message from './components/Message'
import Countries from './components/Countries'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY
console.log("api_key")
console.log(api_key)
const App = () => {
  const [value, setValue] = useState('')
  const [many, setMany] = useState(false)
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {

    // skip if currency is not defined
    if (value) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          let newCountries = response.data.filter((country) => country.name.common.toLowerCase().includes(value))
          if (newCountries.length > 10) {
            setMany(true)
            setCountries([])
          }
          else {
            setMany(false)
            let myCountries = newCountries.map((country) => {
              return ({
                name: country.name.common,
                capital: country.capital[0],
                capitalInfo: country.capitalInfo,
                area: country.area,
                languages: Object.values(country.languages),
                flag: country.flags.png,
                show: false
              })
            
              })
              if (myCountries.length === 1) {
                const lat = countries[0].capitalInfo.latlng[0]
                const lng = countries[0].capitalInfo.latlng[1]
                axios
                  .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
                  .then(response => {
                    setCountries(myCountries)
                    setWeather([{...response.data, iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}])
                  })
              }
              else {
                setCountries(myCountries)
              }
          }
        })
  }
    console.log("countries[0]")
    console.log(countries)
  }, [value])

  console.log("countries")
  console.log(countries)

  const toggleShow = name => {
    const country = countries.find(c => c.name === name)
    const changedCountry = { ...country, show: !country.show}
  
    setCountries(countries.map((country) => country.name !== name ? country : changedCountry))
  }
  const handleChange = (event) => {
    setValue(event.target.value)
  }


  return (
    <div>
      <form>
        country: <input value={value} onChange={handleChange} />
      </form>
      <Message many={many}/>
      <Countries weather = {weather} countries = {countries} toggleShow = {toggleShow} />
    </div>
  )
}

export default App