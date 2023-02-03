import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from "./SelectDate";
import Modal from 'react-modal';
import Barchart from './BarChart';
import Button from 'react-bootstrap/Button';
import '../style/Modal.css'

function MyModal(props){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [list, setList] = useState();
  // props2={props['props']?.[0]['avg_leadtime']}

  const machinery = props['props']?.[0]['machinery']
  const items = props['props']?.[0]['items']
  const part1 = props['props']?.[0]['part1']

  useEffect(()=>{
    getPastLeadtime();
  },[props])

  const getPastLeadtime = async () => {
    
    let url = `http://10.125.121.177:8080/data/past_leadtime?machinery=${machinery}&items=${items}&part1=${part1}`;

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      data.predicted_leadtime = props['props']?.[0]['avg_leadtime']
      setList(data)
    } catch (err) {
      console.log(err);
    }
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return(
    <>
      <Button className='butt2' variant="dark" onClick={() => setModalIsOpen(true)}>시각화</Button>
	    <Modal isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        ariaHideApp={false} 
        style={customStyles}>
        <Barchart props={list}/>
      </Modal>
    </>
  )
};
export default MyModal;