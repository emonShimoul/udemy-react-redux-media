import React from 'react';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItems from './AlbumsListItems';

const AlbumsList = ({ user }) => {
    // console.log(user);
    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    // console.log(results);

    const handleAddAlbum = () => {
        addAlbum(user);
    }

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if (error) {
        content = <div>Error loading a album...</div>
    } else {
        content = data.map(album => {
            return (
                <AlbumsListItems key={album.id} album={album}></AlbumsListItems>
            );
        });
    }

    return (
        <div>
            <div className='m-2 flex flex-row items-center justify-between'>
                <h3 className='text-jg font-bold'>Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    );
};

export default AlbumsList;