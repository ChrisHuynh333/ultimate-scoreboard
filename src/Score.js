import React, {useEffect, useState} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, halftime, firstPointGender, setHalftime} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)

    const changeScore = (score, index, action) => {
        const newScoreArray = [...totalScore]
        if (action === 'dec') {
            if (score > 0) {
                newScoreArray[index] = score - 1
            } else {
                newScoreArray[index] = 0;
            }
        } else {
            newScoreArray[index] = score + 1;
        }
        setTotalScore(newScoreArray)
    }
    
    const checkGender = (count) => {
        console.log(count)
        if(count === 0) {
            setGenderStatus(...[data[0]])
            setGenderCounter(2)
        }
        else if((totalScore[0] === 8 && totalScore[1] < 8) || (totalScore[0] < 8 && totalScore[1] === 8)) {
            setGenderStatus(...[data[1]])
            setGenderCounter(4)
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
    },[totalScore])
    return (
        <div className='score-container'>
            {totalScore.map((score, index) => {
                return (
                    <div key={index}>
                        <button onClick={() => changeScore(score, index, 'dec')}>-</button>
                        {score}
                        <button onClick={() => changeScore(score, index, 'inc')}>+</button>
                    </div>
                )
            })}
            {genderStatus.gender} {genderStatus.point}
        </div>
    )
}

export default Score