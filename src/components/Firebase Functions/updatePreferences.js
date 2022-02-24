import React from "react";
import app from "../base";

export default function updatePreferences(username, primaryColour, secondaryColour, uid){
    if (username && primaryColour && secondaryColour) {
        app.firestore().collection('users').doc(uid).update({
            username: username,
            primaryColour: primaryColour,
            secondaryColour: secondaryColour
        })
    }
}