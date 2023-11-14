import { useContext, createContext, useState } from "react";

const AuthContext = createContext({});

// Used in Components 'above' to 'specify' the context value
export function AuthProvider({ children }) {
    const [isValidExternalToken, setIsValidExternalToken] = useState(false);
    const [externalToken, setExternalToken] = useState("");

    return (
        <AuthContext.Provider
            value={{
                isValidExternalToken,
                setIsValidExternalToken,
                externalToken,
                setExternalToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Used in Components 'below' to 'read' the context value
export const useAuth = () => useContext(AuthContext);
