import React from "react";
import app from "../base";

export default function updatePreferences(primaryColour, secondaryColour, uid){
    app.firestore().collection('preferences').doc(uid).update({
        primaryColour: primaryColour,
        secondaryColour: secondaryColour
    })
}