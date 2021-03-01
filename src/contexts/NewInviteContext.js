import React, { useState } from 'react';

const NewInviteContext = React.createContext();

export function NewInviteProvider({ children }) {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => setFormData({ ...formData, newData });
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
