import React, {useMemo} from 'react';
import useForm from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {getHeroesByName} from '../../selectors/getHeroesByName';
import { heroes } from '../../data/heroes';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q=''} =queryString.parse(location.search);
    const [{search}, handleInputChange] = useForm({
        search: q
    });
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`);
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            name="search"
                            placeholder="Find your hero"
                            className="form-control"
                            onChange={handleInputChange}
                            value={search}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="btn m-1 col-12 btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q==='')
                        &&  <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q!=='' && heroesFiltered.length === 0)
                        &&  <div className="alert alert-danger">
                                There is not a hero with {`"${q}"`}
                            </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
