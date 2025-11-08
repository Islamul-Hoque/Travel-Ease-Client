import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        // Request interceptor
        const requestInterceptor = instance.interceptors.request.use((config)=> {
        if(user?.accessToken){
            config.headers.authorization = `Bearer ${user.accessToken}`
        }
        return config
        })

        // Response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res
        }, err => {
            const status = err?.response?.status
                if(status === 401 || status === 403){
                    signOutUser()
                        .then(()=>{
                            navigate('/register')
                        })
                }
        })

        return ()=> {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    },[user?.accessToken, signOutUser, navigate])
    return instance
};

export default useAxiosSecure;