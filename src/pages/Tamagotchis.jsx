import axios from 'axios'
import React, { useEffect, useState } from 'react'
import format from 'date-fns/format'
import { Link } from 'react-router-dom'

export function Tamagotchis() {
  const [tamagotchis, setTamagotchis] = useState([
    {
      id: 0,
      name: '',
      birthday: null,
      happinessLevel: 0,
      hungerLevel: 0,
      isDead: false,
    },
  ])
  const [newTamagotchi, setNewTamagotchi] = useState('New Tamagotchi Name')
  const apiUrl = `https://jerids-tamagotchi-api.herokuapp.com/api/Pets`
  const dateFormat = `MMMM do, yyyy 'at' h:mm aaa`
  const [hue, setHue] = useState(Math.floor(Math.random() * 360))
  const [saturation, setSaturation] = useState(Math.floor(Math.random() * 100))
  const [lightness, setLightness] = useState(
    Math.floor(Math.random() * 70) + 30
  )

  const randomize = () => {
    setHue(Math.floor(Math.random() * 360))
    setSaturation(Math.floor(Math.random() * 100))
    setLightness(Math.floor(Math.random() * 70) + 30)
  }

  useEffect(async () => {
    const response = await axios.get(apiUrl)
    setTamagotchis(response.data)
  }, [newTamagotchi])

  async function handleNewPet(event) {
    event.preventDefault()
    const response = await axios.post(apiUrl, { name: newTamagotchi })
    setNewTamagotchi('New Tamagotchi Name')
  }

  return (
    <ul>
      {Object.keys(tamagotchis).map((tamagotchi, index) => (
        <li key={index} className="calm">
          <figure
            style={{
              backgroundColor: `hsl(${Math.floor(Math.random() * 360)},
                ${Math.floor(Math.random() * 100)}%,
                ${Math.floor(Math.random() * 70) + 30}%)`,
            }}
          >
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
            <Link to={`/tamagotchi/${tamagotchis[tamagotchi].id}`}>
              Details
            </Link>
          </figure>
        </li>
      ))}
      <li>
        <figure>
          <h2>New Pet</h2>
          <form>
            <input
              type="text"
              value={newTamagotchi}
              onChange={event => setNewTamagotchi(event.target.value)}
            />
            <a href="#" onClick={event => handleNewPet(event)}>
              Submit
            </a>
          </form>
        </figure>
      </li>
    </ul>
  )
}
