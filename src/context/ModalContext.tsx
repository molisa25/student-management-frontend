import React from 'react';

interface ModalContextProps {
    isMyDocumentOpen: boolean;
    setIsMyDocumentOpen: (open: boolean) => void
    isMyCourseOpen: boolean;
    setIsMyCourseOpen: (open: boolean) => void
    isMyModuleOpen: boolean;
    setIsMyModuleOpen: (open: boolean) => void
}

export const ModalContext = React.createContext<ModalContextProps>({isMyDocumentOpen: false, setIsMyDocumentOpen: () => {}, isMyCourseOpen: false, setIsMyCourseOpen: () => {}, isMyModuleOpen: false, setIsMyModuleOpen: () => {}});

export const ModalContextProvider = ({children}: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
    const [isMyDocumentOpen, setIsMyDocumentOpen] = React.useState(false);
    const [isMyCourseOpen, setIsMyCourseOpen] = React.useState(false);
    const [isMyModuleOpen, setIsMyModuleOpen] = React.useState(false);

    const value: ModalContextProps = React.useMemo(() => {
        return {
            isMyDocumentOpen,
            setIsMyDocumentOpen,
            isMyCourseOpen,
            setIsMyCourseOpen,
            isMyModuleOpen,
            setIsMyModuleOpen
        };
    }, [
        isMyDocumentOpen,
        setIsMyDocumentOpen,
        isMyCourseOpen,
        setIsMyCourseOpen,
        isMyModuleOpen,
        setIsMyModuleOpen
    ]);

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
