import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

      <div className='bg-white shadow-lg rounded mx-auto p-4' style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
        <div className='text-end'>
          <div className='text-2xl cursor-pointer' onClick={onClose} style={{ color: '#dc3545' }}>
            <CgClose />
          </div>
        </div>

        <div className='d-flex justify-content-center overflow-hidden p-4' style={{ maxWidth: '80vh', maxHeight: '80vh' }}>
          <img src={imgUrl} alt='Full Screen' style={{ maxWidth: '80vh', maxHeight: '80vh' }} />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage
