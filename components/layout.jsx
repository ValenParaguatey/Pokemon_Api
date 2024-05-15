import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="container">
            <header>
                <h1>Pokémon API</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>© 2024 Pokémon Company</p>
            </footer>
            <style jsx>{`
                .container {
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 10px;
                }
                header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                footer {
                    text-align: center;
                    margin-top: 20px;
                }
            `}</style>
        </div>
    );
};

export default Layout;

