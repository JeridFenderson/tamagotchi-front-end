import axios from 'axios'
import React, { useEffect, useState } from 'react'
import format from 'date-fns/format'

export function Tamagotchis() {
  const [tamagotchis, setTamagotchis] = useState({})
  const [newTamagotchi, setNewTamagotchi] = useState('New Tamagotchi Name')
  const dateFormat = `MMMM do, yyyy 'at' h:mm aaa`

  useEffect(async () => {
    const response = await axios.get(
      `https://jerids-tamagotchi-api.herokuapp.com/api/Pets`
    )
    setTamagotchis(response.data)
  }, [newTamagotchi])

  async function handleNewPet(event) {
    event.preventDefault()
    const response = await axios.post(
      `https://jerids-tamagotchi-api.herokuapp.com/api/Pets`,

      { name: newTamagotchi }
    )
    setNewTamagotchi('New Tamagotchi Name')
  }
  return (
    <ul>
      {Object.keys(tamagotchis).map((tamagotchi, index) => (
        <li key={index}>
          <figure>
            <h2>{tamagotchis[tamagotchi].name}</h2>
            <ul>
              <li>
                Birthday:{' '}
                {format(new Date(tamagotchis[tamagotchi].birthday), dateFormat)}
              </li>
              <li>Happiness Level: {tamagotchis[tamagotchi].happinessLevel}</li>
              <li>Hunger Level: {tamagotchis[tamagotchi].hungerLevel}</li>
              <li>
                Is Alive:
                {tamagotchis[tamagotchi].isDead ? ' No' : ' Yes'}
              </li>
            </ul>
          </figure>
        </li>
      ))}
      <li>
        <figure>
          <h2>New Pet</h2>
          <form onSubmit={handleNewPet}>
            <input
              type="text"
              value={newTamagotchi}
              onChange={event => setNewTamagotchi(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </figure>
      </li>
    </ul>
  )
}
