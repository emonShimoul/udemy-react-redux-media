import React from 'react';
import { useFetchPhotosQuery } from '../store';

const PhotosList = ({ album }) => {
    useFetchPhotosQuery(album);

    return (
        <div>
            <h3>Photos List</h3>
        </div>
    );
};

export default PhotosList;