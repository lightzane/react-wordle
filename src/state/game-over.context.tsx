import React, { createContext, useState } from "react";

export interface GameOverContextType {
    isGameOver: boolean;
    setIsGameOver: (value: boolean) => void;
}

export const GameOverContext = createContext<GameOverContextType | null>(null);

export const GameOverProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {

    const [isGameOver, setIsGameOver] = useState(false);

    const context: GameOverContextType = {
        isGameOver,
        setIsGameOver
    };

    return (
        <GameOverContext.Provider value={context}>
            {children}
        </GameOverContext.Provider>
    );

};
