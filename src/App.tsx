import React, { KeyboardEvent, useCallback, useContext, useEffect, useState } from 'react';
import './App.scss';
import { Board } from './components/board/board';
import { GameToast } from './components/game-toast';
import { Header } from './components/header/header';
import { Keyboard } from './components/keyboard';
import { GlobalContext } from './state/global.context';

export const App: React.FC = () => {

  const globalCtx = useContext(GlobalContext);

  const [isKeydownEnabled, setIsKeydownEnabled] = useState(false);

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'BACKSPACE', 'ENTER'];

    const key = event.key.toUpperCase();

    if (keys.includes(key) && isKeydownEnabled && globalCtx) {

      // * Add letter
      if (key !== 'BACKSPACE' && key !== 'ENTER') {
        globalCtx.incrementBox();
      }

      // * Delete letter
      else if (key === 'BACKSPACE') {
        globalCtx.decrementBox();
      }

      // * Enter and Submit word
      else {
        // Word not completed, do not proceed on entering letter "Enter" key
        if (globalCtx.currentWord && globalCtx.currentWord.length > globalCtx.currentBox) {
          return;
        }
      }

      globalCtx?.enterLetter(key);

    }

  }, [isKeydownEnabled, globalCtx]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown as any);
    return () => {
      document.removeEventListener('keydown', handleKeydown as any);
    };
  }, [isKeydownEnabled, handleKeydown]);

  function handleModalCustomWordOpened(isOpened: boolean) {
    if (isOpened) { setIsKeydownEnabled(false); }
    else { setIsKeydownEnabled(true); }
  }

  return (
    <div className="container">
      <GameToast
        id='toast-word-not-in-list'
        className='text-bg-dark'
        message='Word not in list'
      />
      <Header isModalCustomWordOpened={handleModalCustomWordOpened} />
      <Board />
      <Keyboard />
    </div>
  );

};
