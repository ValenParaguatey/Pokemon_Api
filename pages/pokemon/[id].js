import React from 'react';
import Layout from '../../components/layout';
import PokemonCard from '../../components/pokemonCard';

const PokemonDetails = ({ pokemon }) => {
    return (
        <Layout>
            <PokemonCard pokemon={pokemon} />
        </Layout>
    );
};

export async function getServerSideProps({ params }) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const pokemon = response.data;
    return {
        props: {
            pokemon: {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                type: pokemon.types.map((type) => type.type.name).join(', '),
                abilities: pokemon.abilities.map((ability) => ability.ability.name),
            },
        },
    };
}

export default PokemonDetails;
