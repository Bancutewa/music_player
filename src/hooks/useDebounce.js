import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDebouncedValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [value, ms])
    return debouncedValue
}

export default useDebounce
