const View = ({show, country, weather}) => {
    if (!show) {
        return null
    }
    const Country = (
        <div>
            <h1>{country[0].name}</h1>
            <br />
            <p>capital {country[0].capital}</p>
            <p>area {country[0].area}</p>
            <br />
            <h3>Languages:</h3>
            <ul>
                {country[0].languages.map((language) => <li>{language}</li>)}
            </ul>
            <br />
            <img src = {country[0].flag} />
        </div>
    )

    console.log("weather")
    console.log(weather)
    if (weather.length > 0) {
        const Weather = (
        <div>
            <h1>Weather in {country[0].capital}</h1>
            <br />
            <p>temperature {weather[0].main.temp - 273.15} Celcius</p>
            <br />
            <img src={weather[0].iconUrl} />
            <br />
            <p>wind {weather[0].wind.speed} m/s</p>

        </div>
        )
        return (
            <div>
                {Country}
                {Weather}
            </div>
        )
    }
    else {
        return (
            <div>
                {Country}
            </div>
        )
    }
    
}

export default View;