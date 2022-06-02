import React, {useEffect, useState} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, halftime, firstPointGender, setHalftime} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)
    const [pointsLog, setPointsLog] = useState([{points: totalScore, genderStatus: genderStatus}])
    const [firstRender, setFirstRender] = useState(true)
    const [totalPointsTracker, setTotalPointsTracker] = useState(0)
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
        if (!isUndo) {
            setTotalPointsTracker(totalPointsTracker + 1)
        }
    }

    const undoAction = () => {
        setIsUndo(true)
        console.log(totalPointsTracker)
        setTotalPointsTracker(totalPointsTracker - 1)
        console.log(totalPointsTracker)
        setTotalScore(pointsLog[totalPointsTracker -1].points)
        setGenderStatus(pointsLog[totalPointsTracker -1].genderStatus)
    }
    useEffect(() => {
        checkGender(genderCounter)
        if(!firstRender) {
            setPointsLog([...pointsLog, {points: totalScore, genderStatus}])
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