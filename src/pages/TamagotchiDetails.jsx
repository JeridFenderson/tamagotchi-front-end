import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export function TamagotchiDetails() {
  const [tamagotchi, setTamagotchi] = useState({
    id: 0,
    name: '',
    birthday: null,
    happinessLevel: 0,
    hungerLevel: 0,
    isDead: false,
  })
  const { name, birthday, happinessLevel, hungerLevel, isDead } = tamagotchi
  const { id } = useParams()
  const history = useHistory()
  const apiUrl = `https://jerids-tamagotchi-api.herokuapp.com/api/Pets/${id}`
  const dateFormat = `MMMM do, yyyy 'at' h:mm aaa`

  useEffect(async () => {
    const response = await axios.get(apiUrl)
    setTamagotchi(response.data)
  }, [interactWithTamagotchi])

  async function deleteTamagotchi(event) {
    event.preventDefault()
    const response = await axios.delete(apiUrl)
    history.push('/')
  }

  async function interactWithTamagotchi(event, interaction) {
    event.preventDefault()
    const response = await axios.post(`${apiUrl}/${interaction}`, { id: id })
  }

  return (
    <>
      <article>
        <h2>{name}</h2>
        <h3>Birthday: {format(new Date(birthday), dateFormat)}</h3>
        <h3>Happiness Level: {happinessLevel}</h3>
        <h3>Hunger Level: {hungerLevel}</h3>
        <h3>
          Is Alive:
          {isDead ? ' No' : ' Yes'}
        </h3>
      </article>
      <ul>
        <li>
          <a href="#" onClick={event => interactWithTamagotchi(event, 'Plays')}>
            Play
          </a>
        </li>
        <li>
          <a href="#" onClick={event => interactWithTamagotchi(event, 'Feeds')}>
            Feed
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={event => interactWithTamagotchi(event, 'Scolds')}
          >
            Scold
          </a>
        </li>
      </ul>
      <a href="#" onClick={event => deleteTamagotchi(event)}>
        Delete
      </a>
    </>
  )
}
