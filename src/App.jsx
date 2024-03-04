import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './SharedModule/Components/NavBar/NavBar'
import Home from './HomeModule/Components/Home/Home'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout'
import Login from './AuthModule/Components/Login/Login'
import ForgotPass from './AuthModule/Components/ForgotPass/ForgotPass'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import UsersList from './UsersModule/Components/UsersList/UsersList'
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList'
import NotFound from './SharedModule/Components/NotFound/NotFound'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import Register from './AuthModule/Components/Register/Register'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import DeleteModal from './SharedModule/Components/DeleteModal/DeleteModal'
import RecipesForm from './RecipesModule/Components/RecipesForm/RecipesForm'
import VerifyUserAccount from './AuthModule/Components/VerifyUserAccount/VerifyUserAccount'
import FavoritesList from './FavoritesModule/Components/FavoritesList/FavoritesList'

function App() {
  // const dropContainer = document.getElementById("dropcontainer")
  // const fileInput = document.getElementById("images")

  // dropContainer.addEventListener("dragover", (e) => {
  //   // prevent default to allow drop
  //   e.preventDefault()
  // }, false)

  // dropContainer.addEventListener("dragenter", () => {
  //   dropContainer.classList.add("drag-active")
  // })

  // dropContainer.addEventListener("dragleave", () => {
  //   dropContainer.classList.remove("drag-active")
  // })

  // dropContainer.addEventListener("drop", (e) => {
  //   e.preventDefault()
  //   dropContainer.classList.remove("drag-active")
  //   fileInput.files = e.dataTransfer.files
  // })






  const [adminData,setadminData]=useState(null);

  const saveAdminData=()=>{
    const encodedToken=localStorage.getItem("adminToken");
    const decodedToken=jwtDecode(encodedToken);
    localStorage.setItem('usertype',decodedToken.userGroup)
    setadminData(decodedToken);
  }
  useEffect(()=>{
    if(localStorage.getItem("adminToken")){
      saveAdminData();
    }
  },[])

  const routes=createHashRouter([
    {
      path:'/',
      // element:<ProtectedRoute adminData={adminData}><AuthLayout/></ProtectedRoute>,
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login saveAdminData={saveAdminData}/>},
        {path:'login',element:<Login saveAdminData={saveAdminData}/>},
        {path:'forgot-pass',element:<ForgotPass/>},
        {path:'resetpass',element:<ResetPassword/>},
        {path:'register',element:<Register/>},
        {path:'verifyAccount',element:<VerifyUserAccount/>}
      ],
    },
    {
      path:'dashboard',
      // element:<MasterLayout adminData={adminData}/>,
      element:<ProtectedRoute adminData={adminData}><MasterLayout adminData={adminData}/></ProtectedRoute>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Home adminData={adminData}/>},
        {path:'recipes',element:<RecipesList/>},
        {path:'recipesform/:type',element:<RecipesForm/>},
        {path:'users',element:<UsersList/>},
        {path:'categories',element:<CategoriesList/>},
        {path:`deletemodal`,element:<DeleteModal/>},
        {path:'favorites',element:<FavoritesList/>}
      ],
    }
  ])
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
