import { useEffect, useState } from 'react'

export default function List() {
  const [characters, setCharacters] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [ loading, setLoading] = useState(true);
  
  const searching = !!search.length;
  const list = searching ? results : characters;

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredSearch = characters.filter((character) => 
    character.name.toLowerCase().includes(event.target.value.toLowerCase().trim()));
    setResults(filteredSearch);
}

  useEffect(() => {
      const getCharacters = async () => {
            const res = await fetch(`https://www.officeapi.dev/api/characters/`);
            const { data } = await res.json();
            const characterData = data.map((character) => ({
                id: character._id,
                name: `${character.firstname} ${character.lastname}`
            }));
            setCharacters(characterData);
            setLoading(false);
  };
      getCharacters();
}, []);

  return (
    <>
    <h1>List of Characters</h1>
    {loading ? (
        <p>Loading</p>
    ) : (
    <>
        <input
                    placeholder="Search for a Character"
                    value={search}
                    onChange={(e) => {handleSearch(e)}} />
        <ul>
            {list.map((character) => {
                return (
                    <li key={character.id}>
                        {character.name}
                    </li>
                )
            })}
        </ul>
        </>)}
    
    </>
  )
}
