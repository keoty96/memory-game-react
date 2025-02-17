import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojisData, setEmojisData] = useState([])

  async function startGame(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");

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

  return (
    <>
    { isGameOn ? <MemoryCard emojis={emojisData} /> : <Form startGame={startGame} /> }
    </>
  )
}

export default App
