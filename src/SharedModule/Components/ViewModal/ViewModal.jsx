import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import noData from '../../../assets/imgs/no-datasm.png'
import { toast } from 'react-toastify';
import food from '../../../assets/imgs/food.jpg'
import Avatar from '../../../assets/imgs/Avatar.png'
import Loading from '../Loading/Loading';

export default function ViewModal({Currunt, closeViewModal,type}) {
    const [ViewShow, setViewShow] = useState(true);
    const ViewHandleClose = () => {setViewShow(false); closeViewModal()}
    
  return (
    <>
    <Modal show={ViewShow} onHide={ViewHandleClose} centered={true}>
        <Modal.Header closeButton className='bg-light'>
        </Modal.Header>
        <Modal.Body className='rounded-2'>
            {Currunt?'':<Loading/>}
          <div className='mb-3 mx-5'>
            <div className="text-center">
            {Currunt.imagePath?<img className='viewRecipeimg rounded-5' src={`https://upskilling-egypt.com/${Currunt.imagePath}`} alt="" />
                              :<img className='viewRecipeimg rounded-5' src={type==='Recipe'?food:Avatar} alt="" />}
            <h5 className=' my-2 text-danger'>{type==='Recipe'?Currunt.name:Currunt.userName}</h5>
            </div>

            <div className='row border border-1 rounded-3 text-center mt-3 py-1 bg-light'>
            <h6 className=' mt-3  text-danger'><span className='bg-transparent text-black'>{type==='Recipe'?'Price':'Country'}: </span>{type==='Recipe'?Currunt.price:Currunt.country}</h6>
            <h6 className=' mt-3  text-danger'><span className='bg-transparent text-black'>{type==='Recipe'?'Tag':'Phone Number'}: </span>{type==='Recipe'?Currunt.tag.name:Currunt.phoneNumber}</h6>
            <h6 className=' mt-3  text-danger'><span className='bg-transparent text-black'>{type==='Recipe'?'Category':'Email'}: </span>{type==='Recipe'?Currunt.category[0]?.name:Currunt.email}</h6>
            {type==='Recipe'?<h6 className=' mt-3  text-danger'><span className='bg-transparent text-black'>Description: </span>{Currunt.description}</h6>:''}
            </div>
            
            {/* {fav?
              <div className='text-end mt-3'>
            <button className='btn btn-outline-danger'>Add to fav</button>
            </div>
            :''} */}
            
          </div>
        </Modal.Body>
    
      </Modal>
    </>
  )
}
