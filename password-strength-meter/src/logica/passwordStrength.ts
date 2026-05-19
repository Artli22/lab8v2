export type Strength = 'vacía' | 'débil' | 'media' | 'fuerte' | 'muy fuerte'

export const STRENGTH_VALUES: Record<Strength, number> = {
  'vacía': 0,
  'débil': 25,
  'media': 50,
  'fuerte': 75,
  'muy fuerte': 100,
}

export function calculateStrength(password: string): Strength {
  if (password.length === 0) return 'vacía'
  if (password.length < 8) return 'débil'

  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)

  if (hasNumber && (hasSymbol || hasMixedCase)) return 'muy fuerte'
  if (hasNumber) return 'fuerte'
  return 'media'
}