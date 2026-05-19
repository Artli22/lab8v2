import { useState } from 'react'

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')

  return (
    <div>
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <span data-testid="strength-indicator"></span>
      <div
        role="progressbar"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}