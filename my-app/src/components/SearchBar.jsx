import { useState } from 'react';

import './SearchBar.css'

 const SearchBar = ({onSearch}) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (city) {
            onSearch(city);
            setCity('');
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <span className="search__icon">🔎</span>
            <input
                className="search__input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Los Angeles"
                required
            >
            </input>
        </form>
    )
 }

 export default SearchBar