import { useState, useEffect, useContext } from "react";
import Pet from "./Pet";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchWithin = () => {
    const[location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [breeds] = useBreedList(animal);
    const [pets, setPets] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);
    
    useEffect(() => {
        requestPets();
    }, []);

    async function requestPets() {
        const response = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await response.json();
        setPets(json.pets);
    }

    return (
        <div className="search-params">
        <form onSubmit={(e) => {
            e.preventDefault();
            requestPets();
        }}>
            <label htmlFor="location">
                Location
                <input id="location" value={location} placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}></input>
            </label>
            <label htmlFor="animal">
                Animal
            <select
                id="animal"
                value={animal}
                onChange={(e) => {
                setAnimal(e.target.value);
                setBreed("");
                }}
                onBlur={(e) => {
                setAnimal(e.target.value);
                setBreed("");
                }}>
                <option />
                {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>
                    {animal}
                </option>
                ))}
            </select>
            </label>
            <label htmlFor="breed">
  Breed
  <select
    disabled={!breeds.length}
    id="breed"
    value={breed}
    onChange={(e) => setBreed(e.target.value)}
    onBlur={(e) => setBreed(e.target.value)}
  >
    <option />
    {breeds.map((breed) => (
      <option key={breed} value={breed}>
        {breed}
      </option>
    ))}
  </select>
</label>
<label htmlFor="theme">
  Theme
  <select
    value={theme}
    onChange={(e) => setTheme(e.target.value)}
    onBlur={(e) => setTheme(e.target.value)}
  >
    <option value="peru">Peru</option>
    <option value="darkblue">Dark Blue</option>
    <option value="chartreuse">Chartreuse</option>
    <option value="mediumorchid">Medium Orchid</option>
  </select>
</label>;


<button style={{ backgroundColor: theme }}>Submit</button>;
        </form>
        <Results pets ={pets}/>
    </div>
    );
};
export default SearchWithin;