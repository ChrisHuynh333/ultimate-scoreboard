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
                <div >
                    <span>
                        Gender Setting:
                    </span>
                    <span className="game-start-modal-radio-btn">
                        <input type='radio' name="gender" id="coed" onClick={() => {setCoed(true); setTrackingGender(true)}} defaultChecked/>
                        <label for="coed">Coed</label>
                        <input type='radio' name="gender" id="singleGender" onClick={() => {setCoed(false); setTrackingGender(false)}} />
                        <label for="singleGender">Single Gender</label>
                    </span>
                </div>
                <div className={coed ? "active" : "not-active"}>
                    <span>
                        Track Gender Points: 
                    </span>
                    <span className="game-start-modal-radio-btn">
                        <input type='radio' name="trackGender" id="yesTrackGender" onClick={() => setTrackingGender(true)}defaultChecked/>
                        <label for="yesTrackGender">Yes</label>
                        <input type='radio' name="trackGender" id="noTrackGender" onClick={() => setTrackingGender(false)}/>
                        <label for="noTrackGender">No</label>
                    </span>
                </div>
                <div className={trackingGender ? "active" : "not-active"}>
                    <span>
                        Starting Gender: 
                    </span>
                    <span className="game-start-modal-radio-btn">
                        <input type='radio' name="startingGender" id="femaleStarting" value="female" onChange={e => handleGenderChange(e)} defaultChecked/>
                        <label for="femaleStarting">Female</label>
                        <input type='radio' name="startingGender" id="maleStarting" value="male" onChange={e => handleGenderChange(e)} />
                        <label for="maleStarting">Male</label>
                    </span>
                </div>
                <div>
                    <span>
                        Game Cap: 
                    </span>
                    <span className="game-start-modal-radio-btn">
                        <input type='radio' name="cap" id="capFifteen" value={15} onClick={() => {setCustomCap(false); setNoHalftime(false)}} onChange={e => handleScoreChange(e)} defaultChecked/>
                        <label for="capFifteen">15</label>
                        <input type='radio' name="cap" id="capThirteen" value={13} onClick={() => {setCustomCap(false); setNoHalftime(false)}} onChange={e => handleScoreChange(e)} />
                        <label for="capThirteen">13</label>
                        <input type='radio' name="cap" id="capNoCap" onClick={() => {setCustomCap(false); setNoHalftime(true)}} />
                        <label for="capNoCap">No cap</label>
                        <input type='radio' name="cap" id="capCustomCap" onClick={() => {setCustomCap(true); setNoHalftime(false)}} />
                        <label for="capCustomCap">Custom Cap</label>
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
                    <span className="game-start-modal-radio-btn">
                        <input type='radio' name="halfTime" id="dynamicHalftimePoint" onClick={() => setNoHalftime(false)} checked={noHalftime ? null : true} />
                        <label for="dynamicHalftimePoint">{halftimePoint}</label>
                        <input type='radio' name="halfTime" id="noHalftime" onClick={() => setNoHalftime(true)} checked={noHalftime ? true : null}/>
                        <label for="noHalftime">No Halftime</label>
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