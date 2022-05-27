import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [totalScore, setTotalScore] = useState([0, 0])
    const [coed, setCoed] = useState(true)
    const [halftime, setHalftime] = useState(true)
    const [firstPointGender, setFirstPointGender] = useState('male')
    const [genderStatus, setGenderStatus] = useState({gender: 'male', point: 'game start'})

    
  return <AppContext.Provider value={{
      totalScore, 
      setTotalScore,
      genderStatus,
      setGenderStatus,
      coed,
      halftime,
      setHalftime,
      firstPointGender,
      setFirstPointGender
    }}>{children}</AppContext.Provider>
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }