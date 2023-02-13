import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useThunk } from '../hooks/useThunk';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem';

const UsersList = () => {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    });

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    let content;

    if (isLoadingUsers) {
        content = <Skeleton className="h-10 w-full" times={6} />;
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user}></UsersListItem>
        });
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center m-3'>
                <h1 className='m-2 text-xl'>Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    +Add User
                </Button>

                {creatingUserError && 'error creatng user...'}
            </div>
            {content}
        </div>
    );
};

export default UsersList;