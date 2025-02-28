import { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

// const emojiURL = "https://emojihub.yurace.pro/api/all/category/animals-and-nature"

function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojisData, setEmojisData] = useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    if(selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setMatchedCards(prevState => [...prevState, ...selectedCards]);
    }
  },[selectedCards])

  useEffect(() => {
    if(emojisData.length && matchedCards.length === emojisData.length ) {
      setIsGameOver(true)
    }
  },[matchedCards])

  //console.log("is game over: " + isGameOver)
  //console.log(matchedCards)

  async function startGame(e) {
    e.preventDefault();

    try {
      const response = await fetch("/emojis.json");

      if (!response.ok) {
        throw new Error("Could not fetch data from API")
      }

      const data = await response.json();
      const indices = getRandomIndices(data);   
      const dataSlice = indices.map(index => data[index]);
      const shuffleData = getEmojisArray(dataSlice)
      
      console.log(shuffleData);
      setIsGameOn(true)
      setEmojisData(shuffleData)
  
    } catch (error) {
      console.error(error)
    }
  }

  function getRandomIndices(data) {
    let randomIndicesArray = [];
    let max = data.length - 1

    for (let index = 0; index < 5; index++) {
      const randomNum = Math.floor(Math.random() * max)
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum) 
      } else {
        i--;
      }
    }

    return randomIndicesArray
  }

  function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [pairedEmojisArray[i], pairedEmojisArray[randomIndex]] = [pairedEmojisArray[randomIndex], pairedEmojisArray[i]];
    }

    return pairedEmojisArray;
  }

  function turnCard(name, index) {
    //const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)

    // if(!selectedCardEntry && selectedCards.length < 2) {
    //   setSelectedCards(prevState => [...prevState, {name, index}]);
    // } else if(!selectedCardEntry && selectedCards.length === 2) {
    //   setSelectedCards([{ name, index}])
    // } 
    if(selectedCards.length < 2) {
      setSelectedCards(prevState => [...prevState, {name, index}]);
    } else if(selectedCards.length === 2) {
      setSelectedCards([{ name, index}])
    } 
  }

  //console.log(selectedCards);

  return (
    <>
    { isGameOn ? 
      <MemoryCard 
        handleClick={turnCard} 
        emojis={emojisData} 
        selectedCards={selectedCards}
        matchedCards={matchedCards}  
      /> : 
      <Form startGame={startGame} /> }
    </>
  )
}

export default App
