import React, { useEffect, useState } from 'react';

const NewInviteContext = React.createContext(null);

export function NewInviteProvider({ children }) {
  const [formDataPrev, setFormDataPrev] = useState({});
  const [formData, setFormData] = useState({});
  const [saveData,setSaveData] = useState(false);
  const updateFormData = (newData) => {
    //console.log("New Data",newData)
    setFormDataPrev({ ...formDataPrev, ...newData });
    //console.log("FOrm Existing Data",formData);
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
      }}
    >
      {children}
    </NewInviteContext.Provider>
  );
}

export default NewInviteContext;
