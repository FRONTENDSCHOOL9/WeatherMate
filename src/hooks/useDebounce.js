/* eslint-disable */
import { useState, useEffect } from "react";

// 검색할 때 딜레이 강제시키는 함수
export const useDebounce = (value, delay) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
