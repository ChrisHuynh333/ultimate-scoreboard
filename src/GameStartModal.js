import React, { useState } from "react"
import { useGlobalContext } from "./context"

const GameStartModal = () => {
    const {coed, setCoed, trackingGender, setTrackingGender, setFirstPointGender, halftimePoint, setHalftimePoint, isGameStartModalOpen, setIsGameStartModalOpen, noHalftime, setNoHalftime} = useGlobalContext()
    const [customCap, setCustomCap] = useState(false)
    const [customCapError, setCustomCapError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(halftimePoint <= 0) {
            setCustomCapError(true)
        } else {
            setIsGameStartModalOpen(false)
            setCustomCapError(false)
        }
    }

    const handleScoreChange = (e) => {
        console.log(e.target.value)
        setHalftimePoint(Math.ceil(e.target.value / 2))
    }
    const handleGenderChange = (e) => {
        setFirstPointGender(e.target.value)
    }
    

    return (
        <div className={isGameStartModalOpen ? "game-start-modal-container" : "game-start-modal-container not-active"}>
            <form className="game-start-modal-form" onSubmit={handleSubmit}>
                <div className="game-start-modal-row">
                    <div className="game-start-modal-row-header">
                        Gender Setting
                    </div>
                </div>
                <div className="game-start-modal-row">
                    <div className="game-start-modal-radio-btn">
                        <input type='radio' name="gender" id="coed" onClick={() => {setCoed(true); setTrackingGender(true)}} defaultChecked/>
                        <label for="coed">Coed</label>
                        <input type='radio' name="gender" id="singleGender" onClick={() => {setCoed(false); setTrackingGender(false)}} />
                        <label for="singleGender">Single Gender</label>
                    </div>
                </div>
                <div className={coed ? "game-start-modal-row" : "game-start-modal-row not-active"}>
                    <div className="game-start-modal-row-header">
                        Track Gender Points
                    </div>
                </div>
                <div className={coed ? "game-start-modal-row" : "game-start-modal-row not-active"}>
                    <div className="game-start-modal-radio-btn">
                        <input type='radio' name="trackGender" id="yesTrackGender" onClick={() => setTrackingGender(true)}defaultChecked/>
                        <label for="yesTrackGender">Yes</label>
                        <input type='radio' name="trackGender" id="noTrackGender" onClick={() => setTrackingGender(false)}/>
                        <label for="noTrackGender">No</label>
                    </div>
                </div>
                <div className={trackingGender ? "game-start-modal-row" : "game-start-modal-row not-active"}>
                    <div className="game-start-modal-row-header">
                        Starting Gender 
                    </div>
                </div>
                <div className={trackingGender ? "game-start-modal-row" : "game-start-modal-row not-active"}>
                    <div className="game-start-modal-radio-btn">
                        <input type='radio' name="startingGender" id="femaleStarting" value="female" onChange={e => handleGenderChange(e)} defaultChecked/>
                        <label for="femaleStarting">Female</label>
                        <input type='radio' name="startingGender" id="maleStarting" value="male" onChange={e => handleGenderChange(e)} />
                        <label for="maleStarting">Male</label>
                    </div>
                </div>
                <div className="game-start-modal-row">
                    <div className="game-start-modal-row-header">
                        Game Cap
                    </div>
                </div>
                <div className="game-start-modal-row">
                    <div className="game-start-modal-radio-btn">
                        <input type='radio' name="cap" id="capFifteen" value={15} onClick={() => {setCustomCap(false); setNoHalftime(false)}} onChange={e => handleScoreChange(e)} defaultChecked/>
                        <label for="capFifteen">15</label>
                        <input type='radio' name="cap" id="capThirteen" value={13} onClick={() => {setCustomCap(false); setNoHalftime(false)}} onChange={e => handleScoreChange(e)} />
                        <label for="capThirteen">13</label>
                        <input type='radio' name="cap" id="capNoCap" onClick={() => {setCustomCap(false); setNoHalftime(true)}} />
                        <label for="capNoCap">No cap</label>
                        <input type='radio' name="cap" id="capCustomCap" onClick={() => {setCustomCap(true); setNoHalftime(false); setHalftimePoint(0)}} />
                        <label for="capCustomCap">Custom Cap</label>
                    </div>
                </div>
                <div className={customCap ? "game-start-modal-row" : "game-start-modal-row not-active"}>
                    <div className="game-start-modal-row-header">
                        <span>Custom Cap:  </span>
                        <span>
                            <input type='number' onChange={e => handleScoreChange(e)} />
                            </span>
                    </div>
                </div>
                <div className="game-start-modal-row">
                    <div className="game-start-modal-row-header">
                        Halftime Point
                    </div>
                </div>
                <div className="game-start-modal-row">
                    <div className="game-start-modal-radio-btn">
                        <input type='radio' name="halfTime" id="dynamicHalftimePoint" onClick={() => setNoHalftime(false)} checked={noHalftime ? null : true} />
                        <label for="dynamicHalftimePoint">{halftimePoint}</label>
                        <input type='radio' name="halfTime" id="noHalftime" onClick={() => setNoHalftime(true)} checked={noHalftime ? true : null}/>
                        <label for="noHalftime">No Halftime</label>
                    </div>
                </div>
                <div>
                    {customCapError ? "Please enter a points cap." : null}
                </div>
                <div className="game-start-modal-btn-container">
                    <button className="game-start-modal-btn" type="submit">Start Game</button>
                </div>
            </form>
        </div>
    )
}


export default GameStartModal