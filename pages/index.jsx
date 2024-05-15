import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import PokemonCard from '../components/PokemonCard';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visiblePokemonCount, setVisiblePokemonCount] = useState(20);
    const [totalPokemonCount, setTotalPokemonCount] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    useEffect(() => {
        if (pokemon.length < totalPokemonCount) {
            fetchPokemonData();
        }
    }, [visiblePokemonCount]);

    const fetchPokemonData = async () => {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${visiblePokemonCount}&offset=${offset}`);
        setTotalPokemonCount(response.data.count);
        const newPokemonData = await Promise.all(response.data.results.slice(pokemon.length).map(async (p) => {
            const pokemonResponse = await axios.get(p.url);
            return {
                id: pokemonResponse.data.id,
                name: pokemonResponse.data.name,
                image: pokemonResponse.data.sprites.front_default,
                type: pokemonResponse.data.types.map((type) => type.type.name).join(', '),
                abilities: pokemonResponse.data.abilities.map((ability) => ability.ability.name),
            };
        }));
        setPokemon(prevPokemon => [...prevPokemon, ...newPokemonData]);
        setLoading(false);
        setOffset(prevOffset => prevOffset + visiblePokemonCount);
    };

    const handleLoadMore = () => {
        setVisiblePokemonCount(prevCount => prevCount + 10);
    };

    return (
        <Layout>
            <div className="pokemon-list">
                {pokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </div>
            {totalPokemonCount > pokemon.length && (
                <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Cargando...' : 'Ver más'}
                </button>
            )}
            <style jsx>{`
                .pokemon-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 20px;
                }
                .load-more-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .load-more-button:hover {
                    background-color: #45a049;
                }
            `}</style>
        </Layout>
    );
};

export default PokemonList;
