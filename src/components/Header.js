import React from 'react';

//export default function Header(props) {
export default function Header({title, children}) {//Desestruturando o props
    return (
        <header>
            <h1>{title}</h1>
            {children}
        </header>
    );
}