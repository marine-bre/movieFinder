import React, { useState } from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Start from './Start'

function Thanks() {
    const [start, setStart] = useState(false)
    return (
        <div className='centered'>
        {!start &&<>
            <h1> Thanks for playing!!!</h1>
            <Button onClick={()=>setStart(true)}> Start Over </Button>
           </> }
            
            {start && <Start />}
        </div>
    );
}

export default Thanks;