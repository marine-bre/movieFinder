import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom'
import '../styles.css'
const background1 = 'https://raw.githubusercontent.com/marine-bre/movieFinder/master/client/src/pictures/modal1.png';
const background2 = 'https://raw.githubusercontent.com/marine-bre/movieFinder/master/client/src/pictures/modal2.png';



function Modal({ title, poster, setShowModal, setShowThanks }) {
    const MODAL_STYLE = {
        zIndex: 1000,
        transform: 'translate(-50%, -50%)',
        width: '450px',
        height: '90%',
        top: '50%',
        left: '50%',
        backgroundColor: 'white',
        opacity: '1 !important',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4%',
        alignItems: 'center',
        padding: '20px 80px',
        position: 'fixed'
    }

const [background,setBackground] = useState(background1)
// let background=background1

   
    useEffect(()=>{
        setTimeout(()=> (background===background1)? setBackground(background2) : setBackground(background1), 1000);
    }, [background])

    return ReactDom.createPortal(
        <>
            <div className='overlay' />
                <div style={MODAL_STYLE}>
                    <img className='background-modal' src={background}/>
                    <h1 className='title-font'> Match!!!</h1>
                    <img style={{maxHeight: '60%', width: 'auto' }} alt='poster' src={poster} />
                    <h2 className='m-4'>{title}</h2>
                    <div className='btn-wrapper'>
                        <button className='btn' onClick={() => setShowModal(false)}>Let's keep going</button>
                        <button className='btn' onClick={()=> {setShowThanks(true); setShowModal(false)}}>That's it!</button>
                    </div>
                </div>
        </>,
        document.getElementById('portal')
    );
}

export default Modal;