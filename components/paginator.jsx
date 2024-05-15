import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard';
import axios from 'axios';

const PokemonList = ({ pokemonData }) => {
    const [pokemon, setPokemon] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = async () => {
        setLoading(true);
        const response = await axios.get(nextPageUrl || `https://pokeapi.co/api/v2/pokemon`);
        const newPokemonData = await Promise.all(response.data.results.map(async (p) => {
            const pokemonResponse = await axios.get(p.url);
            return {
                id: pokemonResponse.data.id,
                name: pokemonResponse.data.name,
                image: pokemonResponse.data.sprites.front_default,
                type: pokemonResponse.data.types.map((type) => type.type.name).join(', '),
                abilities: pokemonResponse.data.abilities.map((ability) => ability.ability.name),
            };
        }));
        setPokemon([...pokemon, ...newPokemonData]);
        setNextPageUrl(response.data.next);
        setLoading(false);
    };

    const handleLoadMore = () => {
        fetchPokemonData();
    };

    return (
        <Layout>
            <div className="pokemon-list">
                {pokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
                {nextPageUrl && (
                    <button onClick={handleLoadMore} disabled={loading}>
                        {loading ? 'Cargando...' : 'Cargar más'}
                    </button>
                )}
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemonData = await Promise.all(response.data.results.map(async (p) => {
        const pokemonResponse = await axios.get(p.url);
        return {
            id: pokemonResponse.data.id,
            name: pokemonResponse.data.name,
            image: pokemonResponse.data.sprites.front_default,
            type: pokemonResponse.data.types.map((type) => type.type.name).join(', '),
            abilities: pokemonResponse.data.abilities.map((ability) => ability.ability.name),
        };
    }));
    return {
        props: {
            pokemonData,
        },
    };
}

export default PokemonList;
