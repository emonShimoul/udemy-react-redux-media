import React from 'react';
import { useFetchAlbumsQuery } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

const AlbumsList = ({ user }) => {
    // console.log(user);
    const { data, error, isLoading } = useFetchAlbumsQuery(user);

    let content;
    if (isLoading) {
        content = <Skeleton times={3} />
    } else if (error) {
        content = <div>Error loading a album...</div>
    } else {
        content = data.map(album => {
            const header = <div>{album.title}</div>
            return (
                <ExpandablePanel key={album.id} header={header}>
                    List of Photos in the album
                </ExpandablePanel>
            );
        });
    }

    return (
        <div>
            <div>Albums for {user.name}</div>
            <div>{content}</div>
        </div>
    );
};

export default AlbumsList;