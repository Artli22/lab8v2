import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {

  describe('Renderizado inicial', () => {
    it('renderiza un input de tipo password', () => {
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByTestId('strength-indicator').textContent).toBe('vacía')
    })

    // 5 pts extra: accesibilidad por label/role
    it('el input es accesible por su label (getByLabelText)', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    })

    // 5 pts extra: barra de progreso
    it('renderiza una barra de progreso', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('la barra inicia con aria-valuenow="0"', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
    })
  })

  describe('Comportamiento al escribir', () => {
    it('contraseña corta muestra "débil"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abc')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('débil')
    })

    it('8+ caracteres sin números ni símbolos muestra "media"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('media')
    })

    it('8+ caracteres con número muestra "fuerte"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('fuerte')
    })

    it('8+ caracteres con número y símbolo muestra "muy fuerte"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('muy fuerte')
    })

    it('borrar la contraseña vuelve a mostrar "vacía"', async () => {
      render(<PasswordStrengthMeter />)
      const input = screen.getByLabelText(/contraseña/i)
      await userEvent.type(input, 'abc')
      await userEvent.clear(input)
      expect(screen.getByTestId('strength-indicator').textContent).toBe('vacía')
    })
  })

  describe('Edge cases', () => {
    it('exactamente 8 caracteres sin número no es "débil"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
      expect(screen.getByTestId('strength-indicator').textContent).not.toBe('débil')
    })

    it('exactamente 7 caracteres no es "media"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg')
      expect(screen.getByTestId('strength-indicator').textContent).not.toBe('media')
    })

    it('solo símbolos con menos de 8 caracteres es "débil"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), '!@#')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('débil')
    })
  })

  describe('Barra de progreso (extra)', () => {
    it('la barra refleja aria-valuenow="100" para "muy fuerte"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    })

    it('la barra refleja aria-valuenow="75" para "fuerte"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
    })
  })

  describe('Mayúsculas mezcladas (extra)', () => {
    it('8+ caracteres con número y mayúsculas mezcladas muestra "muy fuerte"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'Abcdefg1')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('muy fuerte')
    })

    it('8+ caracteres con número pero sin mixtura de mayúsculas muestra "fuerte"', async () => {
      render(<PasswordStrengthMeter />)
      await userEvent.type(screen.getByLabelText(/contraseña/i), 'ABCDEFG1')
      expect(screen.getByTestId('strength-indicator').textContent).toBe('fuerte')
    })
  })
})