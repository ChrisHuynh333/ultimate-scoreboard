import React, { useState } from "react"
import { useGlobalContext } from "./context"

const GameStartModal = () => {
    const {coed, setCoed, trackingGender, setTrackingGender, setFirstPointGender, halftimePoint, setHalftimePoint, isGameStartModalOpen, setIsGameStartModalOpen, noHalftime, setNoHalftime} = useGlobalContext()
    const [customCap, setCustomCap] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsGameStartModalOpen(false)
    }

    const handleScoreChange = (e) => {
        setHalftimePoint(Math.ceil(e.target.value / 2))
    }
    const handleGenderChange = (e) => {
        setFirstPointGender(e.target.value)
    }
    

    return (
        <div className={isGameStartModalOpen ? "game-start-modal-container" : "game-start-modal-container not-active"}>
            <form className="game-start-modal-form" onSubmit={handleSubmit}>
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
                    <label for="femaleStarting">Female<input type='radio' name="startingGender" id="femaleStarting" value="female" onChange={e => handleGenderChange(e)} defaultChecked/></label>
                        <label for="maleStarting">Male<input type='radio' name="startingGender" id="maleStarting" value="male" onChange={e => handleGenderChange(e)} /></label>
                    </span>
                </div>
                <div>
                    <span>
                        Game Cap: 
                    </span>
                    <span>
                        <label for="capFifteen">15<input type='radio' name="cap" id="capFifteen" value={15} onClick={() => {setCustomCap(false); setNoHalftime(false)}} onChange={e => handleScoreChange(e)} defaultChecked/></label>
                        <label for="capThirteen">13<input type='radio' name="cap" id="capThirteen" value={13} onClick={() => {setCustomCap(false); setNoHalftime(false)}} onChange={e => handleScoreChange(e)} /></label>
                        <label for="capNoCap">No cap<input type='radio' name="cap" id="capNoCap" onClick={() => {setCustomCap(false); setNoHalftime(true)}} /></label>
                        <label for="capCustomCap">Custom Cap<input type='radio' name="cap" id="capCustomCap" onClick={() => {setCustomCap(true); setNoHalftime(false)}} /></label>
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
                        <label for="dynamicHalftimePoint">{halftimePoint}<input type='radio' name="halfTime" id="dynamicHalftimePoint" onClick={() => setNoHalftime(false)} checked={noHalftime ? null : true} /></label>
                        <label for="noHalftime">No Halftime<input type='radio' name="halfTime" id="noHalftime" onClick={() => setNoHalftime(true)} checked={noHalftime ? true : null}/></label>
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