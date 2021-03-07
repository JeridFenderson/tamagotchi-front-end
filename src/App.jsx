import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Tamagotchis } from './pages/Tamagotchis'
import { TamagotchiDetails } from './pages/TamagotchiDetails'

export function App() {
  return (
    <div className="container">
      <header>
        <h1>Tamagotchi!</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
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
          <Route path="*">Tamagotchi Not Found/Link Not Recognized</Route>
        </Switch>
      </main>
    </div>
  )
}
