// Coed
// Track Gender
// Cap 15 / 13 / No cap / Custom cap
// Halftime dynamic / No halftime

import React from "react"
import { useGlobalContext } from "./context"


const GameStartModal = () => {
    return (
        <div>
            <form>
                <ul>
                    <li>
                        <label for="coed">Coed<input type='radio' name="gender" id="coed" /></label>
                        <label for="singleGender">Single Gender<input type='radio' name="gender" id="singleGender" /></label>
                    </li>
                    <li>
                        <label for="yesTrackGender">Yes<input type='radio' name="trackGender" id="yesTrackGender" /></label>
                        <label for="noTrackGender">No<input type='radio' name="trackGender" id="noTrackGender" /></label>
                    </li>
                    <li>
                        <label for="capFifteen">15<input type='radio' name="cap" id="capFifteen" /></label>
                        <label for="capThirteen">13<input type='radio' name="cap" id="capThirteen" /></label>
                        <label for="capNoCap">No cap<input type='radio' name="cap" id="capNoCap" /></label>
                        <label for="capCustomCap">Custom Cap<input type='radio' name="cap" id="capCustomCap" /></label>
                    </li>
                    <li>
                        <label for="dynamicHalftimePoint">{Math.ceil(15/2)}<input type='radio' name="halfTime" id="dynamicHalftimePoint" /></label>
                        <label for="noHalftime">No Halftime<input type='radio' name="halfTime" id="noHalftime" /></label>
                    </li>
                </ul>
            </form>
        </div>
    )
}


export default GameStartModal