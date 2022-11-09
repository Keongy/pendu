import React, { useEffect, useState } from 'react';
import './App.css';
import { Draw } from './component/Draw';
import { Keyboard } from './component/Keyboard';
import { Lose } from './component/Lose';
import { Win } from './component/Win';
import { Word } from './component/Word';
import { alphabet, getRandom } from './util/common';
import { dictionnaire } from './util/dictionnaire';
import { IAlphabet } from './util/interface';

function App() {
  const [randomWord, setRandomWord] = useState('')
  const [discoverWord, setDiscoverWord] = useState<string[]>([])
  const [countError, setCountError] = useState(0)
  const [endGame, setEndGame] = useState(false)
  const [letterUsed, setLetterUsed] = useState<IAlphabet | null>(null)
  const [alphabetDraft, setAlphabetDraft] = useState<IAlphabet[]>([])
  const [isWin, setIsWin] = useState(false)

  useEffect(() => {
    const copy: IAlphabet[] = structuredClone(alphabet)
    setAlphabetDraft(copy)
  }, [endGame, isWin])

  useEffect(() => {
    const tmp: IAlphabet[] = [...alphabetDraft]

    letterUsed &&
      tmp.map(t => t.letter === letterUsed.letter ? (
        t.existOnWord = letterUsed.existOnWord,
        t.used = letterUsed.used
      ) : (null),
        setAlphabetDraft(tmp)
      )

  }, [letterUsed])

  useEffect(() => {
    newGame()
  }, [])

  const newGame = () => {
    setRandomWord(dictionnaire[getRandom(dictionnaire.length)].toLowerCase())
  }

  useEffect(() => {
    console.log(randomWord);

    const randomWordLength = randomWord.length
    const tmp = []
    for (var i = 0; i < randomWordLength; i++) {
      tmp.push('_')
    }
    setDiscoverWord(tmp)
  }, [randomWord])

  const handleClick = (letter: string) => {
    searchAndReplace(randomWord, letter)
    checkWinOrLose()
  }

  const searchAndReplace = (randomWord: string, letter: string) => {
    const newLetter = letter.toLowerCase()
    let pos = randomWord.indexOf(newLetter);
    let count = [];

    if (pos === -1) {
      const tmp = {
        letter: letter,
        used: true,
        existOnWord: false,
      }

      setLetterUsed(tmp)
      noLetterInWord()
      return
    }

    const tmp = {
      letter: letter,
      used: true,
      existOnWord: true,
    }

    setLetterUsed(tmp)

    while (pos !== -1) {
      count.push(pos);
      pos = randomWord.indexOf(newLetter, pos + 1);
    }

    if (count.length) {
      const updateWord = [...discoverWord]
      for (var i = 0; i < count.length; i++) {
        updateWord.splice(count[i], 1, letter)
      }
      setDiscoverWord(updateWord)

      const compare = updateWord.join('').toLowerCase()
      if (compare === randomWord) {
        console.log("ITS WIN");
        setIsWin(true)
      }
    }
  }


  const noLetterInWord = () => {
    setCountError(countError + 1)
  }

  const checkWinOrLose = () => {
    if (countError >= 9) {
      setEndGame(true)
    }
  }

  const replayGame = () => {
    setEndGame(false)
    setIsWin(false)
    newGame()
    setCountError(0)
  }

  return (
    <div className="App">
      {isWin && <Win replay={replayGame} />}
      {endGame && <Lose
        replay={replayGame}
      />}
      <Draw
        countError={countError}
      />
      <Word
        discoverWord={discoverWord}
      />
      <Keyboard
        handleClick={(letter: string) => handleClick(letter)}
        letterUsed={letterUsed}
        alphabetDraft={alphabetDraft}
      />
    </div >
  );
}

export default App;
