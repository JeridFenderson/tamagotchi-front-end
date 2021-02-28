import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export function App() {
  const [tamagotchis, setTamagotchis] = useState({})
  const [newTamagotchi, setNewTamagotchi] = useState('New Tamagotchi Name')

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
    <>
      <header>
        <h1>Tamagotchi</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to="/1">Page 1</Link>
            </li>
            <li>
              <Link to="/2">Page 2</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/">
          <main>
            <ul>
              {Object.keys(tamagotchis).map((tamagotchi, index) => (
                <li key={index}>
                  <figure>
                    <h2>{tamagotchis[tamagotchi].name}</h2>
                    <ul>
                      <li>Birthday: {tamagotchis[tamagotchi].birthday}</li>
                      <li>
                        Happiness Level:{' '}
                        {tamagotchis[tamagotchi].happinessLevel}
                      </li>
                      <li>
                        Hunger Level: {tamagotchis[tamagotchi].hungerLevel}
                      </li>
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
                  </form>
                </figure>
              </li>
            </ul>
          </main>
        </Route>
        <Route exact path="/1">
          Page 1
        </Route>
        <Route exact path="/2">
          Page 2
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>
    </>
  )
}
