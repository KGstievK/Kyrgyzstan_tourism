import React from 'react';
import Region from './region/Region';
import NavMap from './navMap/NavMap';
import Try from './try/Try';
import Places from './places/Places';

const Regions = () => {
    return (
        <>
            <Region/>
            <NavMap/>
            <Try />
            <Places />   
        </>
    );
};

export default Regions;