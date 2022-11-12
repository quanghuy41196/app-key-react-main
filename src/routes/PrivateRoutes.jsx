import { Navigate, Route, Routes } from "react-router-dom"
import {AppLayout} from '@/layouts/AppLayout'
import { lazy } from "react"


const {PUBLIC_URL} = import.meta.env.BASE_URL

const PrivateRoutes = () => {
    const Dashboard = lazy(() => import('../pages/Dashboard'))
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="auth/*" element={<Navigate to="/dashboard" />} />
                
                <Route path="dashboard" element={<Dashboard />} />

                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>
        </Routes>
    )
}

export {PrivateRoutes}