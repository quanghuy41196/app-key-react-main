const AUTH_LS_KEY = 'mkt-auth'

const getAuth = () => {
    if(!localStorage) return
    const lsValue = localStorage.getItem(AUTH_LS_KEY)
    if(!lsValue) return
    try {
        const auth = JSON.parse(lsValue)
        return auth | null
    } catch (error) {
        console.error("AUTH LOCAL STORAGE PARSE ERROR", error)
    }
}

const setAuth = (auth) => {
    if(!localStorage) return
    try {
        const lsValue = JSON.stringify(auth)
        localStorage.setItem(AUTH_LS_KEY, lsValue)
    } catch (error) {
        console.error("AUTH LOCAL STORAGE SAVE ERROR", error)
    }
}

const removeAuth = () => {
    if (!localStorage) return
    try {
        localStorage.removeItem(AUTH_LS_KEY)
    } catch (error) {
        console.error("AUTH LOCAL STORAGE REMOVE ERROR", error)
    }
}

export {
    getAuth,
    setAuth,
    removeAuth,
    AUTH_LS_KEY
}