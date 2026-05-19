import { useState } from 'react'
import { calculateStrength, STRENGTH_VALUES } from '../logica/passwordStrength'
import type { Strength } from '../logica/passwordStrength'

const STRENGTH_COLORS: Record<Strength, string> = {
  'vacía':     '#e5e7eb',
  'débil':     '#ef4444',
  'media':     '#f97316',
  'fuerte':    '#3b82f6',
  'muy fuerte':'#22c55e',
}

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')

  const strength = calculateStrength(password)
  const value = STRENGTH_VALUES[strength]
  const color = STRENGTH_COLORS[strength]

  return (
    <div style={{ maxWidth: 360, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <label htmlFor="password-input" style={{ display: 'block', marginBottom: 4 }}>
        Contraseña
      </label>
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />

      {/* Barra de progreso */}
      <div style={{ background: '#e5e7eb', borderRadius: 4, marginTop: 8, height: 8 }}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Indicador de fortaleza"
          style={{
            width: `${value}%`,
            height: '100%',
            borderRadius: 4,
            backgroundColor: color,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />
      </div>

      {/* Texto del indicador */}
      <p
        data-testid="strength-indicator"
        style={{ marginTop: 4, color, fontWeight: 600 }}
      >
        {strength}
      </p>
    </div>
  )
}