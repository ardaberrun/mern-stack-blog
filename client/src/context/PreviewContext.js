import React, { createContext,useState } from "react";

export const PreviewContext = createContext();

export default function PreviewProvider({ children }) {

  const [postPreview,setPostPreview] = useState({
    id: null,
    title: "",
    description: "",
    image: "",
    tag: "",
    body: ""
  });
 return (
  <PreviewContext.Provider value={{postPreview, setPostPreview}}>
    {children}
  </PreviewContext.Provider>
 ) 
}
