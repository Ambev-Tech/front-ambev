import React from 'react'
import { GlobalProvider } from './global';
import { FormProvider } from './form';

const AppProvider: React.FC = ({ children }) => {
    return (
        <GlobalProvider>
            <FormProvider>
                {children}
            </FormProvider>
        </GlobalProvider>
    )
}

export default AppProvider;