import React, {useEffect, useState, useRef, forceUpdate} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, firstPointGender} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)
    const [pointsLog, setPointsLog] = useState([{points: totalScore, genderCounter}])
    const [firstRender, setFirstRender] = useState(true)
    const isUndo = useRef(false)
    const halfTimePoint = useRef(0)
    const halfTimeHappened = useRef(false)

    const changeScore = (score, index) => {
        if (isUndo.current) {
            isUndo.current = false
        }
        const newScoreArray = [...totalScore]
        newScoreArray[index] = score + 1;
        setTotalScore(newScoreArray)
        console.log('change score')
    }
    
    const checkGender = (count) => {
        if(totalScore[0] === 0 && totalScore[1] === 0) {
            setGenderStatus(...[data[0]])
            setGenderCounter(2)
        }
        else if((totalScore[0] === 8 && totalScore[1] < 8) || (totalScore[0] < 8 && totalScore[1] === 8)) {
            if (!halfTimeHappened.current) {
                halfTimePoint.current = pointsLog.length
                setGenderStatus(...[data[1]])
                setGenderCounter(4)
                if(!isUndo.current) {
                    halfTimeHappened.current = true
                }
            } else {
                setGenderStatus(...[data[genderCounter]])
                setGenderCounter(genderCounter + 1)
                if (count > 4) {
                    setGenderCounter(2);
                }
            }
        }
        else {
            setGenderStatus(...[data[genderCounter]])
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
        
        
        if(pointsLog.length === halfTimePoint.current + 2) {
            halfTimeHappened.current = false
            setGenderStatus([data[1]])
        }
        if (!isUndo.current) {
            isUndo.current = true
        }
        
    }
    useEffect(() => {
        console.log('useEffect')
        console.log(totalScore)
        checkGender(genderCounter)
        if(!firstRender && !isUndo.current) {
            setPointsLog([...pointsLog, {points: totalScore, genderCounter}])
        }
        setFirstRender(false)
    },[totalScore])


    return (
        <div>
            <button onClick={() => undoAction()}>undo</button>
            <div className='score-container'>
                {totalScore.map((score, index) => {
                    return (
                        <div key={index}>
                            <button onClick={() => changeScore(score, index)}>{score}</button>
                        </div>
                    )
                })}
                {genderStatus.gender} {genderStatus.point}
            </div>
            </div>
    )
}

export default Score