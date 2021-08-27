import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface GlobalContextData {
    openSelect: string;
    setOpenSelect(value: string): void;
    ClickOnApp(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

export const GlobalProvider: React.FC = ({ children }) => {
    const [openSelect, setOpenSelect] = useState<string>('-1')

    const ClickOnApp = useCallback((event) => {
        const className = event?.target.getAttribute ? event.target.getAttribute('class') : ''
        if (className !== openSelect) setOpenSelect(className)
    }, [openSelect])

    return (
        <GlobalContext.Provider value={{ ClickOnApp, openSelect, setOpenSelect }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobal(): GlobalContextData {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('useGlobal must be used within an GlobalProvider')
    }
    return context;
}