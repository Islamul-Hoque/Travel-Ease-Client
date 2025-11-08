import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import Spinner from '../Components/Spinner';


const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading) return <Spinner/>
    if(user) return children;
    return <Navigate to='/login' state={{ from: location?.pathname }} />
};

export default PrivateRouter;