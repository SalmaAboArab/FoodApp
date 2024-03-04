import React from 'react'
import Header from '../../../SharedModule/Components/Header/Header';
import headerimg from "../../../assets/imgs/header1.png"
import Loading from '../../../SharedModule/Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import RecipesHeader from '../../../SharedModule/Components/RecipesHeader/RecipesHeader';


export default function Home({adminData}) {
  const navigate=useNavigate();
  return (
    <>
    <Header main={'Welcome'} title={`${adminData?.userName}`} description="This is a welcoming screen for the entry of the application , you can now see the options" img={headerimg}/>
     <RecipesHeader title={'Fill'} btnTitle={'Fill'}/>
    </>
  )
}
