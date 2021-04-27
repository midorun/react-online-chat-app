import React, { useState, useEffect } from 'react'

const _prefix = 'online-chat-app-';

function useLocalStorage(key, initialValue) {
  key = _prefix + key;

  const [storedValue, setStoredValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) {
      return JSON.parse(jsonValue)
    }
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
