import React from 'react';


function Footer(props) {
  return (
    <div className="w-full flex items-center justify-center" style={{height: props.height}}>
      <span className="text-gray-400 tracking-widest" style={{fontFamily: ['Inter', 'sans-serif'], fontWeight: 200}}>Bank Tukar Sampah Indonesia | 2021</span>
    </div>
  )
}

export default Footer;