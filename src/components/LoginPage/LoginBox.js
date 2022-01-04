import React from 'react';
import MiniBox from "../styled/MiniBox";

export default function LoginBox(props) {
    const {signin} = props
    return (

            <MiniBox>
                <h1 class="mb-10 text-2xl">Website Scaffold</h1>
                <button class="p-2 border border-gray-300 bg-white flex shadow rounded-md" onClick={signin}>
                    <img
                        class="pr-2"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="Google Logo"/>
                    <p class="text-base">Sign in with Google</p>
                </button>
            </MiniBox>

    )
}
