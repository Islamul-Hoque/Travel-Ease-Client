import React from 'react';
import { useLoaderData } from 'react-router';

const VehiclesDetails = () => {
    const data = useLoaderData()
    console.log(data);
    return (
        <div>
            <h3>details</h3>
        </div>
    );
};

export default VehiclesDetails;