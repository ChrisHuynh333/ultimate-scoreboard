import React, { useState, useContext } from 'react'
import useLocalStorageForState from './useLocalStorageForState'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [totalScore, setTotalScore] = useLocalStorageForState("totalScore", [0, 0])
    const [coed, setCoed] = useLocalStorageForState("coed", true)
    const [firstPointGender, setFirstPointGender] = useLocalStorageForState("firstPointGender", null)
    const [genderStatus, setGenderStatus] = useLocalStorageForState("genderStatus", {})
    const [trackingGender, setTrackingGender] = useLocalStorageForState("trackingGender", true)
    const [halftimePoint, setHalftimePoint] = useLocalStorageForState("halftimePoint", 8)
    const [isGameStartModalOpen, setIsGameStartModalOpen] = useLocalStorageForState("isGameStartModalOpen", true)
    const [noHalftime, setNoHalftime] = useLocalStorageForState("noHalftime", false)
    const [teamNames, setTeamNames] = useLocalStorageForState("teamNames", ["Team 1", "Team 2"])

    
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