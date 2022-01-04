import React from 'react';
import MiniBox from "../styled/MiniBox";

export default function LoginBox(props) {
    const {signin} = props
    return (

            <MiniBox>
                <h1 className="mb-10 text-2xl">Website Scaffold</h1>
                <button className="p-2 border border-gray-300 bg-white flex shadow rounded-md" onClick={signin}>
                    <img
                        className="pr-2"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="Google Logo"/>
                    <p className="text-base">Sign in with Google</p>
                </button>
            </MiniBox>

    )
}
