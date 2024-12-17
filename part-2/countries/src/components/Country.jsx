import View from './View'
const Country = ({country, toggleShow, weather}) => {
    console.log(country)
    return (
        <div>
            <li>
                {country[0].name} 
                <button onClick={toggleShow}>{country[0].show? `dont't show` : `show`}</button>
                <br />
                <View show = {country[0].show} country = {country} weather = {weather}/>
            </li>

        </div>
    )
}

export default Country;