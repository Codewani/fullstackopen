import Country from "./Country";
import View from "./View";

const Countries = ({countries, weather, toggleShow}) => {
    if (countries.length === 1) {
        return (
            <View show = {true} country = {[countries[0]]} weather = {weather}/>
        )
    }
    return(
        <div>
            <ul>
                {countries.map((country) => <Country key = {country.name} country = {[country]} toggleShow = {() => toggleShow(country.name)} />)}
            </ul>    
        </div>
    )
}

export default Countries;