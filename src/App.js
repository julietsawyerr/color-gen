import React, { useEffect, useState } from 'react';
import Values from 'values.js'
import SingleColor from './SingleColor'

import './style.css'

function App() {
    const [color, setColor] = useState('')
    const [number, setNumber] = useState(10)
    const [list, setList] = useState(new Values('#1919ff').all(number))
    const [error, setError] = useState(false)
    const [numError, setNumError] = useState(false)

    useEffect(() => {
        if(number < 0 || number > 100){
            setNumber(0)
        }
    }, [number])


    useEffect(() => {
        const timeOut = setTimeout(()=>{
            if(error || numError){
                setError(false)
                setNumError(false)
            }
        }, 3000)
        return () => {
            clearTimeout(timeOut)
        }
    }, [error, numError])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const colors = new Values(color).all(parseInt(number))
            setList(colors)

           
        } catch (error) {
            const regex = /^#[0-9A-F]{6}$/i.test(color)
             if (!regex){
                setError(true) 
             }
           
            if(number === 0){
                setNumError(true)
            }
            
        }     
        
    }

    return (
        <>
        {/* form section */}
        <section className="container">
            <h2>Color Generator</h2>
            <form onSubmit={handleSubmit} className='form'>
                <div className='first-div'>
                <label htmlFor="color">Enter a color/hex:  </label>
                    <input 
                    type="text"
                    value={color}
                    placeholder='#1919ff'
                    id='color'
                    onChange={(e) => setColor(e.target.value)}
                    required
                    className={`${error ? 'error' : null}`}
                    />
               </div>

               <div className='second-div'>
                <label htmlFor="number">Enter Number between 1 - 100:</label>
                    <input 
                    type="number" 
                    value={number} 
                    id='number'
                    onChange={(e) => setNumber(e.target.value)}
                    required 
                    className={`${numError ? 'num-error' : null}`}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>

        {/* color section */}
        <section className="color">
            {list.map((color, index) => {
                return <SingleColor key={index} {...color} index={index} hexColor={color.hex}/>
            })}
        </section>
        </>
    );
}

export default App;