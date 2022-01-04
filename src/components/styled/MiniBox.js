import React from 'react';

export default function MiniBox(props) {
    return (
        <div className="bg-purple-300 h-screen flex items-center justify-center">
            <div className="bg-white border border-gray-400 shadow-lg flex flex-col items-center p-10 rounded-md">
                {props.children}
            </div>
        </div>
    )
}
