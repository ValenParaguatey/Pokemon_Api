import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="card">
            <img src={pokemon.image} alt={pokemon.name} />
            <div className="info">
                <h2>{pokemon.name}</h2>
                <p>Type: {pokemon.type}</p>
                <p>Abilities: {pokemon.abilities.join(', ')}</p>
            </div>
            <style jsx>{`
                .card {
                    border: 2px solid #00FF00;
                    border-radius: 16px;
                    border-widtg: 3px 5px 5px 3px
                    padding: 10px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                }
                .card img {
                    width: 100px;
                    height: 100px;
                    
                }
                .info {
                    flex: 1;
                    font-size: 22px;
                    text-align: left;      
                }

                p {
                    color: #008080
                    font-weight: bold
                }
            `}</style>
        </div>
    );
};

export default PokemonCard;

