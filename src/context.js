import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [totalScore, setTotalScore] = useState([0, 0])
    const [coed, setCoed] = useState(true)
    const [genderStatus, setGenderStatus] = useState({gender: 'male', point: 'game start'})

    const checkGender = () => {
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
    useEffect(() => {
        if(coed) {
            checkGender();
            console.log(genderStatus)
        }
    },[totalScore])
  return <AppContext.Provider value={{
      totalScore, 
      setTotalScore
    }}>{children}</AppContext.Provider>
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }