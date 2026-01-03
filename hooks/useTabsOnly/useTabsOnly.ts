"use client"

import { useState } from "react"

interface UseTabsOnlyProps {
  initialTabValue: number
}

export const useTabsOnly = ({ initialTabValue }: UseTabsOnlyProps) => {
  const [tabValue, setTabValue] = useState(initialTabValue)

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue)
  }

  return {
    tabValue,
    handleTabChange,
  }
}
