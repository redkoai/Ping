import React, { useState } from 'react';

const NewInviteContext = React.createContext();

export function NewInviteProvider({ children }) {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    console.log("New Data", newData)
    setFormData({ ...formData,...newData })
    console.log("Form Existing Data", formData)
  }
  const resetFormData = () => setFormData({});

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
