import React, { createContext, useContext, useState } from 'react'

export const addCategoryResponseContext = createContext()

const ContextApi = ({children}) => {
    const [addCategoryResponse,setAddCategoryResponse] =useState("")
    const [category, setCategory] = useState([]);
  return (
      <addCategoryResponseContext.Provider value={{addCategoryResponse,setAddCategoryResponse}}>
        {children}
      </addCategoryResponseContext.Provider>
  )
}

export default ContextApi