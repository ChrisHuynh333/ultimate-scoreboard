import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [totalScore, setTotalScore] = useState([0, 0])
    const [coed, setCoed] = useState(true)
    const [firstPointGender, setFirstPointGender] = useState(null)
    const [genderStatus, setGenderStatus] = useState({})
    const [trackingGender, setTrackingGender] = useState(true)
    const [halftimePoint, setHalftimePoint] = useState(8)
    const [isGameStartModalOpen, setIsGameStartModalOpen] = useState(true)
    const [noHalftime, setNoHalftime] = useState(false)
    const [teamNames, setTeamNames] = useState(["Us", "Them"])

    
  return <AppContext.Provider value={{
      totalScore, 
      setTotalScore,
      genderStatus,
      setGenderStatus,
      coed,
      setCoed,
      firstPointGender,
      setFirstPointGender,
      trackingGender,
      setTrackingGender,
      halftimePoint,
      setHalftimePoint,
      isGameStartModalOpen,
      setIsGameStartModalOpen,
      noHalftime,
      setNoHalftime,
      teamNames,
      setTeamNames
    }}>{children}</AppContext.Provider>
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }