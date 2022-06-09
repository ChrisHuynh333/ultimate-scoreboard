import React, {useEffect, useState, useRef, forceUpdate} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, firstPointGender, isGameStartModalOpen, halftimePoint, trackingGender, noHalftime, setIsGameStartModalOpen, 
    setCoed, setFirstPointGender, setTrackingGender, setHalftimePoint, setNoHalftime} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)
    const [pointsLog, setPointsLog] = useState([{points: totalScore, genderCounter}])
    const [firstRender, setFirstRender] = useState(true)
    const [genderData, setGenderData] = useState([])
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const isUndo = useRef(false)
    const halftimePointInLog = useRef(0)
    const halftimeHappened = useRef(false)

    const changeScore = (score, index) => {
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
        }
        else if(((totalScore[0] === halftimePoint && totalScore[1] < halftimePoint) || (totalScore[0] < halftimePoint && totalScore[1] === halftimePoint)) && !noHalftime) {
            if (!halftimeHappened.current) {
                halftimePointInLog.current = pointsLog.length
                setGenderStatus(...[genderData[1]])
                setGenderCounter(4)
                if(!isUndo.current) {
                    halftimeHappened.current = true
                }
            } else {
                setGenderStatus(...[genderData[genderCounter]])
                setGenderCounter(genderCounter + 1)
                if (count > 4) {
                    setGenderCounter(2);
                }
            }
        }
        else {
            setGenderStatus(...[genderData[genderCounter]])
            setGenderCounter(genderCounter + 1)
            if (count > 4) {
                setGenderCounter(2);
            }
        }
    }

    const undoAction = () => {
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
    }

    useEffect(() => {
        checkGender(genderCounter)
        if(!firstRender && !isUndo.current) {
            setPointsLog([...pointsLog, {points: totalScore, genderCounter}])
        }
        setFirstRender(false)
        console.log(halftimePoint)
    },[totalScore])

    useEffect(() => {
        let correctData = []
        if(firstPointGender === 'male') {
            correctData = data[0]
        } else {
            correctData = data[1]
        }
        setGenderData(correctData)
        setGenderStatus(correctData[0])
    }, [isGameStartModalOpen])

    return (
        <div className={isGameStartModalOpen ? "not-active" : "active"}>
            <div className={confirmModalOpen ? "active" : "not-active"}>
                <div>Start new game?</div>
                <button onClick={() => newGame()}>Confirm</button>
                <button onClick={() => setConfirmModalOpen(false)}>No</button>
            </div>
            <div className="score-container">
            <div className={totalScore[0] + totalScore[1] === 0 ? null : "inactive"}>
                <button onClick={() => undoAction()}>undo</button>
            </div>
            <div className="scores">
                {totalScore.map((score, index) => {
                    return (
                        <div className={`score-${index}`} key={index}>
                            <button onClick={() => changeScore(score, index)}>{score}</button>
                        </div>
                    )
                })}
            </div>
            <div className={trackingGender ? null : "not-active"}>
                {genderStatus.gender} {genderStatus.point}
            </div>
            
            <button onClick={() => setConfirmModalOpen(true)}>New Game</button>
            </div>
        </div>
    )
}

export default Score