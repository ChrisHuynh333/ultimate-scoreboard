import React, {useEffect, useState} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, halftime, firstPointGender, setHalftime} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)
    const [pointsLog, setPointsLog] = useState([{points: totalScore, genderCounter}])
    const [firstRender, setFirstRender] = useState(true)
    const [isUndo, setIsUndo] = useState(false)

    const changeScore = (score, index) => {
        setIsUndo(false)
        const newScoreArray = [...totalScore]
        newScoreArray[index] = score + 1;
        setTotalScore(newScoreArray)
    }
    
    const checkGender = (count) => {
        if(totalScore[0] === 0 && totalScore[1] === 0) {
            setGenderStatus(...[data[0]])
            setGenderCounter(2)
        }
        else if((totalScore[0] === 8 && totalScore[1] < 8) || (totalScore[0] < 8 && totalScore[1] === 8)) {
            if (halftime) {
                
                setGenderStatus(...[data[1]])
                setGenderCounter(4)
                setHalftime(false)
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
        setIsUndo(true)
        if(pointsLog.length === 0) {
            setFirstRender(true)
            setTotalScore([0, 0])
        }
        else {
            setTotalScore(pointsLog[(pointsLog.length - 1)].points)
            setGenderCounter(pointsLog[(pointsLog.length - 1)].genderCounter)
            if (pointsLog.length > 0) {
                console.log('hi')
                let newArray = pointsLog.filter((element, index) => index < pointsLog.length - 1)
                console.log(newArray)
                setPointsLog(newArray)
            }
            console.log(pointsLog)
        }
        
        
        if((totalScore[0] === 8 && totalScore[1] < 8) || (totalScore[0] < 8 && totalScore[1] === 8)) {
            setHalftime(true)
        }
        
    }
    useEffect(() => {
        checkGender(genderCounter)
        if(!firstRender && !isUndo) {
            setPointsLog([...pointsLog, {points: totalScore, genderCounter}])
        }
        setFirstRender(false)
        console.log(pointsLog)
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