// Coed
// Track Gender
// Cap 15 / 13 / No cap / Custom cap
// Halftime dynamic / No halftime

import React, {useState} from "react"
import { useGlobalContext } from "./context"


const handleSubmit = (e) => {
    e.preventDefault()
}

const GameStartModal = () => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    <div>
                        <span>
                            Gender Setting:
                        </span>
                        <span>
                            <label for="coed">Coed<input type='radio' name="gender" id="coed" defaultChecked/></label>
                            <label for="singleGender">Single Gender<input type='radio' name="gender" id="singleGender" /></label>
                        </span>
                    </div>
                    <div>
                        <span>
                            Track Gender Points: 
                        </span>
                        <span>
                            <label for="yesTrackGender">Yes<input type='radio' name="trackGender" id="yesTrackGender" defaultChecked/></label>
                            <label for="noTrackGender">No<input type='radio' name="trackGender" id="noTrackGender" /></label>
                        </span>
                    </div>
                    <div>
                        <span>
                            Starting Gender: 
                        </span>
                        <span>
                            <label for="maleStarting">Male<input type='radio' name="startingGender" id="maleStarting" /></label>
                            <label for="femaleStarting">Female<input type='radio' name="startingGender" id="femaleStarting" /></label>
                        </span>
                    </div>
                    <div>
                        <span>
                            Game Cap: 
                        </span>
                        <span>
                            <label for="capFifteen">15<input type='radio' name="cap" id="capFifteen" defaultChecked/></label>
                            <label for="capThirteen">13<input type='radio' name="cap" id="capThirteen" /></label>
                            <label for="capNoCap">No cap<input type='radio' name="cap" id="capNoCap" /></label>
                            <label for="capCustomCap">Custom Cap<input type='radio' name="cap" id="capCustomCap" /></label>
                        </span>
                    </div>
                    <div>
                        <span>
                            Halftime Point:
                        </span>
                        <span>
                            <label for="dynamicHalftimePoint">{Math.ceil(15/2)}<input type='radio' name="halfTime" id="dynamicHalftimePoint" defaultChecked /></label>
                            <label for="noHalftime">No Halftime<input type='radio' name="halfTime" id="noHalftime" /></label>
                        </span>
                    </div>
                    <div>
                        <button type="submit">Start Game</button>
                    </div>
                </ul>
            </form>
        </div>
    )
}


export default GameStartModal