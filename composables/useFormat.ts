const currencyBreakpoints = [
  {
    min: 1_000_000,
    name: ['millón', 'millones'],
  },
  {
    min: 1_000_000_000,
    name: ['mil millones', 'mil millones'],
  },
  {
    min: 1_000_000_000_000,
    name: ['billón', 'billones'],
  },
  {
    min: 1_000_000_000_000_000,
    name: ['trillón', 'trillones'],
  },
  {
    min: 1_000_000_000_000_000_000,
    name: ['cuatrillón', 'cuatrillones'],
  },
  {
    min: 1_000_000_000_000_000_000_000,
    name: ['quintillón', 'quintillones'],
  },
]

export function useFormat() {
  /**
   * Given a currency amount, returns a string with the corresponding amount formatted if number is greater than 1,000,000,000
   *
   * Use it for the user's money
   *
   * @param value currency amount
   * @returns formatted currency amount
   *
   * @example
   * formatCurrency(2_400_746.93847) // 2.400.746,94
   * formatCurrency(5_400_000_000) // 5,4 mil millones
   * formatCurrency(5_452_200_000_057) // 5,452 billones
   */
  function currencyToString(value: number) {
    if (value < 1_000_000_000) {
      return value.toLocaleString('es-ES', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    }
    else {
      const breakpoint = currencyBreakpoints.findLast(b => value >= b.min)
      if (breakpoint && value / breakpoint.min < 1000) {
        const amount = value / breakpoint.min
        const breakPointName = breakpoint.name[amount < 1.001 ? 0 : 1]
        return `${amount.toLocaleString('es-ES', { maximumFractionDigits: 3, minimumFractionDigits: 0 })} ${breakPointName}`
      }
      else {
        // return value in cientific notation
        return value.toLocaleString('es-ES', {
          notation: 'scientific',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })
      }
    }
  }

  /**
   * Given a currency amount, returns a string with the corresponding amount formatted if number is greater than 1,000,000
   *
   * Use it for:
   * - Items income
   * - Items cost
   * - Upgrade costs
   * - Manager costs
   *
   * @param value currency amount
   * @returns formatted currency amount
   *
   * @example
   * formatUpgradeCost(400_746.93847) // 400.746,94
   * formatUpgradeCost(5_400_000) // 5,4 millones
   * formatUpgradeCost(5_452_200_000_057) // 5,452 billones
   */
  function numberToString(value: number) {
    if (value < 1_000_000) {
      // TODO: change this to custom function
      return value.toLocaleString('es-ES', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    }
    else {
      const breakpoint = currencyBreakpoints.findLast(b => value >= b.min)
      if (breakpoint && value / breakpoint.min < 1000) {
        const amount = value / breakpoint.min
        const breakPointName = breakpoint.name[amount < 1.001 ? 0 : 1]
        return `${amount.toLocaleString('es-ES', { maximumFractionDigits: 3, minimumFractionDigits: 0 })} ${breakPointName}`
      }
      else {
        // return value in cientific notation
        return value.toLocaleString('es-ES', {
          notation: 'scientific',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })
      }
    }
  }

  /**
   * Given a number of milliseconds, return a string with the corresponding amount formatted this way:
   *
   * HH:MM:SS
   * @param value milliseconds
   */
  function msToHHMMSS(value: number) {
    const hours = Math.floor(value / 3600000)
    const minutes = Math.floor((value - hours * 3600000) / 60000)
    const seconds = Math.floor((value - hours * 3600000 - minutes * 60000) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return {
    currencyToString,
    numberToString,
    msToHHMMSS,
  }
}
