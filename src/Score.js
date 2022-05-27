import React, {useEffect, useRef} from 'react'
import { useGlobalContext } from './context'

const Score = () => {
    const {totalScore, setTotalScore, genderStatus, setGenderStatus, coed, halftime, firstPointGender, setHalftime} = useGlobalContext();

    const determineGender = (initialGender, totalScore, totalHalftimeScore) => {
        const otherGender = initialGender == 'm' ? 'f' : 'm';

        if (totalHalftimeScore) {
            return Math.floor((totalScore - totalHalftimeScore + 1) / 2) % 2 ? initialGender : otherGender;
        }

        return (Math.floor(totalScore / 2) % 2) ? otherGender : initialGender;
    };

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
        checkGender(action)
        
    }
    
    const checkGender = (action) => {
        console.log(totalScore, genderStatus)
        if(coed) {
            if (action === 'inc') {
                if(totalScore[0] === 8 || totalScore[1] === 8) {
                    if(halftime) {
                        if(firstPointGender === 'male') {
                            setGenderStatus({gender: 'female', point: 'half time point'})
                        } else {
                            setGenderStatus({gender: 'male', point: 'half time point'})
                        }
                        setHalftime(false)
                    } else {
                        if(genderStatus.point !== 1 && genderStatus.point !== 2) {
                            if(genderStatus.gender === 'male') {
                                setGenderStatus({gender: 'female', point: 1})
                            } else {
                                setGenderStatus({gender: 'male', point: 1})
                            }
                        } else if(genderStatus.point === 1) {
                            setGenderStatus({...genderStatus, point: 2})
                        } else if(genderStatus.point === 2) {
                            if(genderStatus.gender === 'male') {
                                setGenderStatus({gender: 'female', point: 1})
                            } else {
                                setGenderStatus({gender: 'male', point: 1})
                            }
                        }
                    }
                } else if(genderStatus.point !== 1 && genderStatus.point !== 2) {
                    if(genderStatus.gender === 'male') {
                        setGenderStatus({gender: 'female', point: 1})
                    } else {
                        setGenderStatus({gender: 'male', point: 1})
                    }
                } else if(genderStatus.point === 1) {
                    setGenderStatus({...genderStatus, point: 2})
                } else if(genderStatus.point === 2) {
                    if(genderStatus.gender === 'male') {
                        setGenderStatus({gender: 'female', point: 1})
                    } else {
                        setGenderStatus({gender: 'male', point: 1})
                    }
                }
            }
        }
    }

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