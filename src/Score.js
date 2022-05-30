import React, {useEffect, useState} from 'react'
import { useGlobalContext } from './context'
import data from './data'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, halftime, firstPointGender, setHalftime} = useGlobalContext();
    const [genderCounter, setGenderCounter] = useState(0)
    const [genderCountPriorToHalf, setGenderCountPriorToHalf] = useState(null)
    const [pointAction, setPointAction] = useState('inc')
    const [decMultiClick, setDecMultiClick] = useState(false)

    const changeScore = (score, index, action) => {
        const newScoreArray = [...totalScore]
        setPointAction(action)
        if (action === 'inc') {
            setDecMultiClick(false)
        }
        if (action === 'dec') {
            if(!decMultiClick) {
                if(genderCounter < 4) {
                    if (genderCounter === 2) {
                        setGenderCounter(4)
                    } else {
                        setGenderCounter(5)
                    }
                } else {
                    setGenderCounter(genderCounter - 2)
                }
                setDecMultiClick(true)
            }
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
        if(pointAction === 'inc') {
            if(totalScore[0] === 0 && totalScore[1] === 0) {
                setGenderStatus(...[data[0]])
                setGenderCounter(2)
            }
            else if((totalScore[0] === 8 && totalScore[1] < 8) || (totalScore[0] < 8 && totalScore[1] === 8)) {
                if (halftime) {
                    setGenderCountPriorToHalf(genderCounter)
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
        } else {
            if(totalScore[0] === 0 && totalScore[1] === 0) {
                setGenderStatus(...[data[0]])
                setGenderCounter(2)
            }
            else if((totalScore[0] === 8 && totalScore[1] < 8) || (totalScore[0] < 8 && totalScore[1] === 8)) {
                if(!halftime) {
                    setGenderStatus(...[data[1]])
                    setGenderCounter(4)
                    setHalftime(true)
                } else {
                    setGenderCounter(genderCounter - 1)
                    setGenderStatus(...[data[genderCounter]])
                if (count < 3) {
                    setGenderCounter(5);
                }
                }
            } else {
                setGenderCounter(genderCounter - 1)
                setGenderStatus(...[data[genderCounter]])
                if (count < 3) {
                    setGenderCounter(5);
                }
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