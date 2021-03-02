import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import { Tamagotchis } from './pages/Tamagotchis'

export function TamagotchiDetails() {
  const [tamagotchi, setTamagotchi] = useState({})
  const params = useParams()
  const dateFormat = `MMMM do, yyyy 'at' h:mm aaa`

  useEffect(async () => {
    const response = await axios.get(
      `https://jerids-tamagotchi-api.herokuapp.com/api/Pets/${params.id}`
    )
    setTamagotchi(response.data)
  }, [params.id])
  return (
    <>
      <article>
        <h2>{tamagotchi.name}</h2>
        <h3>Birthday: {format(new Date(tamagotchi.birthday), dateFormat)}</h3>
        <h3>Happiness Level: {tamagotchi.happinessLevel}</h3>
        <h3>Hunger Level: {tamagotchi.hungerLevel}</h3>
        <h3>
          Is Alive:
          {tamagotchi.isDead ? ' No' : ' Yes'}
        </h3>
      </article>
      <ul>
        <li>
          <button>Play</button>
        </li>
        <li>
          <button>Feed</button>
        </li>
        <li>
          <button>Scold</button>
        </li>
      </ul>
      <button>Delete</button>
    </>
  )
}

export function App() {
  return (
    <>
      <header>
        <h1>Tamagotchi!</h1>
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
      <main>
        <Switch>
          <Route exact path="/">
            <Tamagotchis />
          </Route>
          <Route exact path="/tamagotchi/:id">
            <TamagotchiDetails />
          </Route>
          <Route exact path="/2">
            Page 2
          </Route>
          <Route path="*">Tamagotchi Not Found</Route>
        </Switch>
      </main>
    </>
  )
}
