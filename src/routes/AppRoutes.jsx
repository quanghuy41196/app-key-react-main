import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts"
import App from "../layouts/App"
import { PrivateRoutes } from "./PrivateRoutes"
import Login from '../pages/Login'

const {PUBLIC_URL} = import.meta.env.BASE_URL

const AppRoutes = () => {
    const {currentUser} = useAuth()

    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <Routes>
                <Route element={<App />}>
                {currentUser ? (
                    <>
                        <Route path="*" element={<PrivateRoutes />} />
                        <Route index element={<Navigate to='/dashboard' />} />
                    </>
                ) : (
                    <>
                        <Route path='auth/*' element={<Login />} />
                        <Route path='*' element={<Navigate to='/auth' />} />
                    </>
                )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export {AppRoutes}