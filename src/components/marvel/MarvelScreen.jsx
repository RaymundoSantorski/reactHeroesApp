import React from 'react';
import {HeroeList} from '../heroes/HeroeList';

export const MarvelScreen = () => {
    return (
        <>
            <h1>Marvel Screen</h1>
            <hr/>
            <HeroeList publisher="Marvel Comics" />
        </>
    )
}
