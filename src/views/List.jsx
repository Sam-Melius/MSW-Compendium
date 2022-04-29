import { useEffect, useState } from 'react'

export default function List() {
  const [characters, setCharacters] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [searchBy, setSerachBy] = useState('characters');

  const list = characters;

  useEffect(() => {
      const getCharacters = async () => {
            const res = await fetch(`https://www.officeapi.dev/api/characters/`);
            console.log(res);
            const { data } = await res.json();
            const characterData = data.map((character) => ({
                id: character._id,
                name: `${character.firstname} ${character.lastname}`
            }));
            setCharacters(characterData);
  };
      getCharacters();
}, []);

  return (
    <>
    <h1>List of Characters</h1>
    <>
    <ul>
        {list.map((character) => {
            return (
                <li key={character.name}>
                    {character.name}
                </li>
            )
        })}
    </ul>
    </>
    </>
  )
}
