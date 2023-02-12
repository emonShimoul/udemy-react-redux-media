import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useThunk } from '../hooks/useThunk';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

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

    if (isLoadingUsers) {
        return <Skeleton className="h-10 w-full" times={6} />;
    }

    if (loadingUsersError) {
        return <div>Error fetching data...</div>
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className='flex p-2 justify-between items-center cursor-pointer'>
                    {user.name}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='flex flex-row justify-between m-3'>
                <h1 className='m-2 text-xl'>Users</h1>
                {
                    isCreatingUser ? 'Creating user...' :
                        <Button onClick={handleUserAdd}>
                            +Add User
                        </Button>
                }
                {creatingUserError && 'error creatng user...'}
            </div>
            {renderedUsers}
        </div>
    );
};

export default UsersList;