import React, { useState, useEffect } from 'react';

function SingleColor({rgb, weight, hexColor, type}) {
    const [alert, setAlert] = useState(false)

    const hexValue = `#${hexColor}`
    let hexCol = ''

    if(type === 'shade'){
        hexCol = 'color-light'
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setAlert(false)
        }, 2000)

        return () => {
            clearTimeout(timeOut)
        }
    }, [alert])

 
    return (
        <article 
        className={hexCol}
        style={{background: hexValue, padding:'5px 20px'}}
        onClick={() => {
            setAlert(true)
            navigator.clipboard.writeText(hexValue)
        }}
        >
            <p>{`${weight}%`}</p>
            <p>{hexValue}</p>
            {alert && <p>Copied</p>}
        </article>
    );
}

export default SingleColor;