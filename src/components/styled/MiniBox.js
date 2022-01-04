import React from 'react';

export default function MiniBox(props) {
    return (
        <div class="bg-purple-300 h-screen flex items-center justify-center">
            <div class="bg-white border border-gray-400 shadow-lg flex flex-col items-center p-10 rounded-md">
                {props.children}
            </div>
        </div>
    )
}
