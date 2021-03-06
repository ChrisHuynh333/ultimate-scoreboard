import React, { useEffect } from 'react'
import { useGlobalContext } from './context'
import data from './data'
import useLocalStorageForRef from './useLocalStorageForRef'
import useLocalStorageForState from './useLocalStorageForState'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, firstPointGender, isGameStartModalOpen, halftimePoint, trackingGender, noHalftime, setIsGameStartModalOpen, 
    setCoed, setFirstPointGender, setTrackingGender, setHalftimePoint, setNoHalftime, teamNames, setTeamNames, refreshBool} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useLocalStorageForState("genderCounter", 0)
    const [pointsLog, setPointsLog] = useLocalStorageForState("pointsLog", [{points: totalScore, genderCounter}])
    const [firstRender, setFirstRender] = useLocalStorageForState("firstRender", true)
    const [genderData, setGenderData] = useLocalStorageForState("genderData", [])
    const [confirmModalOpen, setConfirmModalOpen] = useLocalStorageForState("confirmModalOpen", false)
    const isUndo = useLocalStorageForRef("isUndo", false)
    const halftimePointInLog = useLocalStorageForRef("halftimePointInLog", 0)
    const halftimeHappened = useLocalStorageForRef("halftimeHappened", false)
    const currentPointIsHalftime = useLocalStorageForRef("currentPointIsHalftime", false)
    
    const changeScore = (score, index) => {
        refreshBool.current = false;
        if (isUndo.current) {
            isUndo.current = false
        }
        const newScoreArray = [...totalScore]
        newScoreArray[index] = score + 1;
        setTotalScore(newScoreArray)
    }
    
    const checkGender = (count) => {
        if(totalScore[0] === 0 && totalScore[1] === 0) {
            setGenderStatus(...[genderData[0]])
            setGenderCounter(2)
            currentPointIsHalftime.current = false
        }
        else if(((totalScore[0] === halftimePoint && totalScore[1] < halftimePoint) || (totalScore[0] < halftimePoint && totalScore[1] === halftimePoint)) && !noHalftime) {
            if (!halftimeHappened.current) {
                halftimePointInLog.current = pointsLog.length
                setGenderStatus(...[genderData[genderCounter]])
                setGenderCounter(genderCounter + 1)
                if (count > 4) {
                    setGenderCounter(2);
                }
                currentPointIsHalftime.current = true
                if(!isUndo.current) {
                    halftimeHappened.current = true
                }
            } else {
                setGenderStatus(...[genderData[genderCounter]])
                setGenderCounter(genderCounter + 1)
                if (count > 4) {
                    setGenderCounter(2);
                }
                currentPointIsHalftime.current = false
            }
        }
        else {
            setGenderStatus(...[genderData[genderCounter]])
            setGenderCounter(genderCounter + 1)
            if (count > 4) {
                setGenderCounter(2);
            }
            currentPointIsHalftime.current = false
        }
    }

    const undoAction = () => {
        refreshBool.current = false;
        if(pointsLog.length === 0) {
            setFirstRender(true)
            setTotalScore([0, 0])
        }
        else {
            const prevPoints = pointsLog[(pointsLog.length - 2)].points
            const prevGender = pointsLog[(pointsLog.length - 2)].genderCounter
            setTotalScore(prevPoints)
            setGenderCounter(prevGender)
            if (pointsLog.length > 0) {
                let newArray = pointsLog.filter((element, index) => index < pointsLog.length - 1)
                setPointsLog(newArray)
            }
        }
        
        
        if(pointsLog.length === halftimePointInLog.current + 2) {
            halftimeHappened.current = false
            setGenderStatus([genderData[1]])
        }
        if (!isUndo.current) {
            isUndo.current = true
        }
    }

    const handleTeamChange = (newName, index) => {
        const newTeamNames = [...teamNames]
        newTeamNames[index] = newName
        setTeamNames(newTeamNames)
    }

    const newGame = () => {
        setTotalScore([0, 0])
        setCoed(true)
        setFirstPointGender(null)
        setGenderStatus({})
        setTrackingGender(true)
        setHalftimePoint(8)
        setIsGameStartModalOpen(true)
        setNoHalftime(false)
        setConfirmModalOpen(false)
        setGenderCounter(0)
        setPointsLog([{points: [0, 0], genderCounter: 0}])
        setGenderData([])
        setTeamNames(["Team 1", "Team 2"])
        halftimePointInLog.current = 0;
        halftimeHappened.current = false;
        currentPointIsHalftime.current = false;
        refreshBool.current = false;
    }

    useEffect(() => {
        if(!refreshBool.current || (refreshBool.current && totalScore[0] === 0 && totalScore[1] === 0 )) {
            checkGender(genderCounter)
        if(!firstRender && !isUndo.current) {
            if(totalScore[0] === 0 && totalScore[1] === 0) {
                setPointsLog([{points: totalScore, genderCounter}])
            } else {
                setPointsLog([...pointsLog, {points: totalScore, genderCounter}])
            }
        }
        setFirstRender(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[totalScore])

    useEffect(() => {
        let correctData = []
        if(firstPointGender === 'male') {
            correctData = data[0]
        } else {
            correctData = data[1]
        }
        setGenderData(correctData)
        if(totalScore[0] === 0 && totalScore[1] === 0) {
            setGenderStatus(correctData[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGameStartModalOpen])

    return (
        <div className={isGameStartModalOpen ? "not-active" : "active"}>
            <div className={confirmModalOpen ? "confirm-modal" : "confirm-modal not-active"}>
                <div className="confirm-modal-text">Start new game?</div>
                <div className="confirm-modal-btn-container">
                    <button className="confirm-modal-no-btn" onClick={() => setConfirmModalOpen(false)}>No</button>
                    <button className="confirm-modal-confirm-btn" onClick={() => newGame()}>Confirm</button>
                </div>
            </div>
            <div className={currentPointIsHalftime.current ? "pop-up-modal" : "pop-up-modal not-active"}>
                <p>Halftime</p>
            </div>
            <div className="score-container">
                <div className="undo-btn-container">
                    <button className={totalScore[0] + totalScore[1] === 0 ? "inactive-undo-btn" : "undo-btn"} onClick={() => undoAction()}>Undo</button>
                </div>
                    <form className="team-name-container">
                        {teamNames.map((teamName, index) => {
                            return (
                                <span className="team-name-text-field">
                                    <input key={index} className="team-name-text" onChange={e => handleTeamChange(e.target.value, index)} onClick={(e) => e.target.select()} type="text" value={teamName}/>
                                </span>
                            )
                        })}
                    </form>
                <div className="scores">
                    {totalScore.map((score, index) => {
                        return (
                            <div className={`score-${index}`} key={index}>
                                <button className="score-btn" onClick={() => changeScore(score, index)}>{score}</button>
                            </div>
                        )
                    })}
                </div>
                <div className={trackingGender ? null : "not-active"}>
                    <div className="gender-point-container">
                        <div className="gender-tracker">
                            <span className="tracker-header">Gender</span>
                            <span className="tracker-text">{genderStatus.gender}</span>
                            
                        </div>
                        <div className="gender-point-tracker">
                            <span className="tracker-header">Point</span>
                            <span className="tracker-text">{genderStatus.point}</span>
                        </div>
                    </div>
                </div>
                <div className="new-game-btn-container">
                    <button className="new-game-btn" onClick={() => setConfirmModalOpen(true)}>New Game</button>
                </div>
            </div>
        </div>
    )
}

export default Score