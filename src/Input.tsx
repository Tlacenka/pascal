import React, { useState } from 'react';
import { Strength, STRENGTH_BADGE } from './constants';
import { calculateStrength } from './utils';


export const Input: React.FC = () => {
  const [password, setPassword] = useState('')
  const strength = calculateStrength(password)

  return (
    <div>

      <form>
        <label>Zadej heslo: </label>
        <input type="text" name="password" onChange={e => setPassword(e.target.value)}/><br/>
      </form>

      <p>
        Síla hesla: <StrengthBadge strength={strength} />
      </p>
      <hr/>
    </div>
  )
}



export const StrengthBadge: React.FC<{strength: Strength}> = (props) => {

  const strengthColors: Record<Strength, string> = {
    strong: '#ce377d',
    fair: '#98347F',
    weak: '#2d2e83',
    unacceptable: '#797979',
  }
  return (
    <span id="strength" style={{backgroundColor: strengthColors[props.strength]}} >{STRENGTH_BADGE[props.strength]}</span>
  )
}
