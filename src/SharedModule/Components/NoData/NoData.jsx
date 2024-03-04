import React from 'react'
import noData from '../../../assets/imgs/no-datasm.png'

export default function NoData() {
  return (
<div className='text-center'><img src={noData} alt="no data" className='mb-2'/> <h5 className='fw-bold'>No Data !</h5> </div>  
)
}
