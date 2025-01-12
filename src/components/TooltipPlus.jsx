import React, { useState } from 'react';

const TooltipPlus = ({ children, text, positionTop = '50%', positionLeft = '50%' }) => {
    const [showText, setShowText] = useState(false);

    return (
        <div
            style={{
                position: 'fixed', // Pozycjonowanie względem ekranu
                top: positionTop, // Ustawienie pozycji od góry
                left: positionLeft, // Ustawienie pozycji od lewej
                transform: 'translate(-50%, -50%)', // Centrowanie elementu względem punktu
                display: 'inline-block', // Dla poprawnego zachowania układu
            }}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
        >
            <div
                style={{
                    padding: '10px',
                    border: '1px solid black', // Obramowanie w kolorze czarnym
                    cursor: 'pointer',
                    backgroundColor: 'black', // Tło w kolorze czarnym
                    color: 'white', // Tekst w kolorze białym
                    borderRadius: '5px',
                    textAlign: 'center',
                }}
            >
                {children}
            </div>
            {showText && (
                <div
                    style={{
                        position: 'absolute',
                        top: '110%', // Pozycja poniżej przycisku
                        left: '50%',
                        transform: 'translateX(-50%)', // Centrowanie względem przycisku
                        padding: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        borderRadius: '5px',
                        marginTop: '5px',
                        width: '500px', // Zwiększona maksymalna szerokość
                        whiteSpace: 'normal', // Pozwala na zawijanie tekstu w linie
                        textAlign: 'center', // Opcjonalnie wyrównanie tekstu na środku
                        zIndex: 10,
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default TooltipPlus;
