// Coed
// Track Gender
// Cap 15 / 13 / No cap / Custom cap
// Halftime dynamic / No halftime

import React, {useState} from "react"
import { useGlobalContext } from "./context"

const GameStartModal = () => {
    const {coed, setCoed, trackingGender, setTrackingGender, setFirstPointGender, halftimePoint, setHalftimePoint} = useGlobalContext()
    const [customCap, setCustomCap] = useState(false)
    

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleScoreChange = (e) => {
        setHalftimePoint(e.target.value)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>
                        Gender Setting:
                    </span>
                    <span>
                        <label for="coed">Coed<input type='radio' name="gender" id="coed" onClick={() => {setCoed(true); setTrackingGender(true)}} defaultChecked/></label>
                        <label for="singleGender">Single Gender<input type='radio' name="gender" id="singleGender" onClick={() => {setCoed(false); setTrackingGender(false)}} /></label>
                    </span>
                </div>
                <div className={coed ? "active" : "not-active"}>
                    <span>
                        Track Gender Points: 
                    </span>
                    <span>
                        <label for="yesTrackGender">Yes<input type='radio' name="trackGender" id="yesTrackGender" onClick={() => setTrackingGender(true)}defaultChecked/></label>
                        <label for="noTrackGender">No<input type='radio' name="trackGender" id="noTrackGender" onClick={() => setTrackingGender(false)}/></label>
                    </span>
                </div>
                <div className={trackingGender ? "active" : "not-active"}>
                    <span>
                        Starting Gender: 
                    </span>
                    <span>
                        <label for="maleStarting">Male<input type='radio' name="startingGender" id="maleStarting" onClick={() => setFirstPointGender("male")} /></label>
                        <label for="femaleStarting">Female<input type='radio' name="startingGender" id="femaleStarting" onClick={() => setFirstPointGender("female")} /></label>
                    </span>
                </div>
                <div>
                    <span>
                        Game Cap: 
                    </span>
                    <span>
                        <label for="capFifteen">15<input type='radio' name="cap" id="capFifteen" value={15} onClick={() => setCustomCap(false)} onChange={e => handleScoreChange(e)} defaultChecked/></label>
                        <label for="capThirteen">13<input type='radio' name="cap" id="capThirteen" value={13} onClick={() => setCustomCap(false)} onChange={e => handleScoreChange(e)} /></label>
                        <label for="capNoCap">No cap<input type='radio' name="cap" id="capNoCap" onClick={() => setCustomCap(false)} /></label>
                        <label for="capCustomCap">Custom Cap<input type='radio' name="cap" id="capCustomCap" onClick={() => setCustomCap(true)} /></label>
                    </span>
                </div>
                <div className={customCap ? "active" : "not-active"}>
                    <span>
                        Custom Cap:
                    </span>
                    <span>
                        <input type='number' onChange={e => handleScoreChange(e)} />
                    </span>
                </div>
                <div>
                    <span>
                        Halftime Point:
                    </span>
                    <span>
                        <label for="dynamicHalftimePoint">{Math.ceil(halftimePoint/2)}<input type='radio' name="halfTime" id="dynamicHalftimePoint" defaultChecked /></label>
                        <label for="noHalftime">No Halftime<input type='radio' name="halfTime" id="noHalftime" /></label>
                    </span>
                </div>
                <div>
                    <button type="submit">Start Game</button>
                </div>
            </form>
        </div>
    )
}


export default GameStartModal