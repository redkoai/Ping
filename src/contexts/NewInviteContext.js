import React, { useEffect, useState } from 'react';

const NewInviteContext = React.createContext(null);

export function NewInviteProvider({ children }) {
  const [formDataPrev, setFormDataPrev] = useState({});
  const [formData, setFormData] = useState({});
  const [saveData,setSaveData] = useState(false);
  const [bgImage, setBgImage] = useState(null);
  const updateFormData = (newData) => {
    //console.log("New Data",newData)
    setFormDataPrev({ ...formDataPrev, ...newData });
    //console.log("FOrm Existing Data",formData);
  }

  const setSelectedImage = (imageSelected) => {
    console.log("image selected is",imageSelected)
    setBgImage(imageSelected);
  }

  useEffect(() => {
    console.log("in context use effect", formDataPrev)
    setFormData(formDataPrev);
  },[formDataPrev])


  const resetFormData = () => setFormDataPrev({});

  return (
    <NewInviteContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        setSelectedImage,
        bgImage
      }}
    >
      {children}
    </NewInviteContext.Provider>
  );
}

export default NewInviteContext;
