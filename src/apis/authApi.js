import axiosClient from "./axiosClient"

const login = (email, password) => {
    return {
        'apiToken': 'Loged in'
    }
    return axiosClient.post('auth/login', {email, password})
}

const logout = () => {
    return;
    return axiosClient.post('auth/logout', {logout: 1})
}

const getUserByToken = (apiToken) => {
    return {
        'email': 'demo@demo.local',
        'nam': 'PhanMemMKT'
    }
    return axiosClient.post('auth/token', {apiToken})
}

export {
    login,
    logout,
    getUserByToken
}