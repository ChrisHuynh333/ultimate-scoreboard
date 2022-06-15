import React, { useState, useEffect, useRef } from 'react'

const useLocalStorageForRef = (storageKey, fallbackState) => {
    const value = useRef(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
  
    localStorage.setItem(storageKey, JSON.stringify(value.current));
    console.log(storageKey, value.current)
    return value;
  };


export default useLocalStorageForRef