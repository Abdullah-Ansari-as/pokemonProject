import React, { useEffect, useState } from 'react'
import './index.css'
import PokemonCards from './PokemonCards'

function Pokemon() {

  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  // console.log(userSearch);
  
  // console.log(pokemon);


  const API = 'https://pokeapi.co/api/v2/pokemon?limit=100'
  const apiData = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json(); //-> all api data in json format
      // console.log(data);

      // det furthur url in an api.
      const detailedPokemonData = data.results.map(async (curPokemon) => {

        console.log(curPokemon);
        
        const res = await fetch(curPokemon.url)
        const data = await res.json();
        return data;
      });
      console.log(detailedPokemonData);

      // to check all promises are resolved. 
      const detailedResponses = await Promise.all(detailedPokemonData)
      // console.log(detailedResponses);          
      setPokemon(detailedResponses)
      setLoading(false)

    } catch (error) {
      console.log('Error: ', error);
      setLoading(false)
      setError(error)

    }
  }

  useEffect(() => {
    apiData();
  }, [])


  // handle search functionality
  const Usersearch = pokemon.filter((curPokemon)=>{
   return curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase())
  })

  // handle loading during the data is re-render
  if(loading){
    return <div>
      <h1>Loading...</h1>
    </div>
  }

  // handle error if data is not show
  if(error){
    return <div>
      <h1>{error.message}</h1>
    </div>
  }

  return (
    <>
      <section className='container'>
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
           type="text" 
           placeholder='Search pokemon' 
           value={search} 
           onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div>
          <ul className='cards'>

            {
              // pokemon.map((curPokemon) => {  //-> before search functionality 
                Usersearch.map((curPokemon) => { //-> after search functionality
                // console.log(curPokemon);

                return <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                 
                
              })
            }

          </ul>
        </div>
      </section>
    </>
  )
}

export default Pokemon