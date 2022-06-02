import React, {useEffect, useState} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, halftime, firstPointGender, setHalftime} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)
    const [pointsLog, setPointsLog] = useState([{points: totalScore, genderStatus: genderStatus}])

    const changeScore = (score, index) => {
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
    useEffect(() => {
        checkGender(genderCounter)
        setPointsLog([...pointsLog, {points: totalScore, genderStatus}])
        console.log(pointsLog)
    },[totalScore])
    return (
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
    )
}

export default Score