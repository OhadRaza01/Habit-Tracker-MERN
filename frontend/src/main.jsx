import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DashboardLayout from './layout/DashboardLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index={true} element={<DashboardPage />} />
        <Route path="/dashboard/habits" />
        <Route path="/dashboard/statistics" />
        <Route path="/dashboard/settings" />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
