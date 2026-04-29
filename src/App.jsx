import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import ResetPasswordRequestScreen from './Screens/ResetPasswordRequestScreen/ResetPasswordRequestScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'
import WorkspaceScreen from './Screens/WorkspaceScreen/WorkspaceScreen'
import WorkspaceMiddleware from './Middlewares/WorkspaceMiddleware'


import MainLayout from './Components/MainLayout'
import './globals.css'


const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/' element={<LoginScreen />} />
      <Route path='/reset-password-request' element={<ResetPasswordRequestScreen />} />
      <Route path='/reset-password/:reset_password_token' element={<ResetPasswordScreen />} />
      <Route element={<AuthMiddleware />}>
        <Route element={<MainLayout />}>
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/workspace/new' element={<CreateWorkspaceScreen />} />
          <Route path='/workspace/:workspace_id' element={<WorkspaceMiddleware />}>
            <Route index element={<WorkspaceScreen />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App