import { describe, it, expect } from 'vitest'
import { calculateStrength } from './passwordStrength'

describe('calculateStrength — lógica pura', () => {

  describe('vacía', () => {
    it('retorna "vacía" cuando el string está vacío', () => {
      expect(calculateStrength('')).toBe('vacía')
    })
  })

  describe('débil', () => {
    it('retorna "débil" para menos de 8 caracteres', () => {
      expect(calculateStrength('abc')).toBe('débil')
    })
    it('retorna "débil" para exactamente 7 caracteres', () => {
      expect(calculateStrength('abcdefg')).toBe('débil')
    })
    it('retorna "débil" para solo símbolos con menos de 8 caracteres', () => {
      expect(calculateStrength('!@#')).toBe('débil')
    })
  })

  describe('media', () => {
    it('retorna "media" para 8+ caracteres sin números ni símbolos', () => {
      expect(calculateStrength('abcdefgh')).toBe('media')
    })
    it('exactamente 8 caracteres sin número no es "débil"', () => {
      expect(calculateStrength('abcdefgh')).not.toBe('débil')
    })
    it('exactamente 7 caracteres no es "media"', () => {
      expect(calculateStrength('abcdefg')).not.toBe('media')
    })
  })

  describe('fuerte', () => {
    it('retorna "fuerte" para 8+ caracteres con al menos un número', () => {
      expect(calculateStrength('abcdefg1')).toBe('fuerte')
    })
    it('mayúsculas sin mixtura + número es "fuerte", no "muy fuerte"', () => {
      expect(calculateStrength('ABCDEFG1')).toBe('fuerte')
    })
  })

  describe('muy fuerte', () => {
    it('retorna "muy fuerte" para 8+ caracteres con número y símbolo', () => {
      expect(calculateStrength('abcdefg1!')).toBe('muy fuerte')
    })
    it('retorna "muy fuerte" para 8+ caracteres con número y mayúsculas mezcladas', () => {
      expect(calculateStrength('Abcdefg1')).toBe('muy fuerte')
    })
    it('8+ caracteres, número, símbolo y mixtura sigue siendo "muy fuerte"', () => {
      expect(calculateStrength('Abcdefg1!')).toBe('muy fuerte')
    })
  })
})