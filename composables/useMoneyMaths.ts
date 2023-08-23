import type { BuyMode } from 'index'

interface LevelBreakpoint {
  level: number
  effect: number
}
const levelBreakpoints: LevelBreakpoint[] = [
  { level: 25, effect: 2 },
  { level: 50, effect: 2 },
  { level: 100, effect: 2 },
  { level: 200, effect: 2 },
  { level: 300, effect: 2 },
  { level: 400, effect: 2 },
  { level: 500, effect: 4 },
  { level: 600, effect: 4 },
  { level: 700, effect: 4 },
  { level: 800, effect: 4 },
  { level: 900, effect: 4 },
  { level: 1000, effect: 5 },
  { level: 1100, effect: 4 },
  { level: 1200, effect: 4 },
  { level: 1300, effect: 4 },
  { level: 1400, effect: 4 },
  { level: 1500, effect: 4 },
  { level: 1600, effect: 4 },
  { level: 1700, effect: 4 },
  { level: 1800, effect: 4 },
  { level: 1900, effect: 4 },
  { level: 2000, effect: 5 },
  { level: 2250, effect: 2 },
  { level: 2500, effect: 2 },
  { level: 2750, effect: 2 },
  { level: 3000, effect: 5 },
  { level: 3250, effect: 2 },
  { level: 3500, effect: 2 },
  { level: 3750, effect: 2 },
  { level: 4000, effect: 5 },
  { level: 4250, effect: 2 },
  { level: 4500, effect: 2 },
  { level: 4750, effect: 2 },
  { level: 5000, effect: 5 },
  { level: 5250, effect: 3 },
  { level: 5500, effect: 3 },
  { level: 5750, effect: 3 },
  { level: 6000, effect: 5 },
  { level: 6250, effect: 3 },
  { level: 6500, effect: 3 },
  { level: 6750, effect: 3 },
  { level: 7000, effect: 5 },
  { level: 7250, effect: 3 },
  { level: 7500, effect: 3 },
  { level: 7777, effect: 3 },
  { level: 8000, effect: 3 },
  { level: 8200, effect: 3 },
  { level: 8400, effect: 3 },
  { level: 8600, effect: 3 },
  { level: 8800, effect: 3 },
  { level: 9000, effect: 3 },
  { level: 9100, effect: 3 },
  { level: 9200, effect: 3 },
  { level: 9300, effect: 3 },
  { level: 9400, effect: 3 },
  { level: 9500, effect: 3 },
  { level: 9600, effect: 3 },
  { level: 9700, effect: 3 },
  { level: 9800, effect: 3 },
  { level: 9999, effect: 1.999 },
  { level: 10000, effect: 5 },
]

export function useMoneyMaths() {
  function nextItemLevelBreakpoint(currentLevel: number) {
    let nextBreakpoint = 0
    levelBreakpoints.forEach((breakpoint) => {
      if (currentLevel < breakpoint.level && nextBreakpoint === 0)
        nextBreakpoint = breakpoint.level
    })
    return nextBreakpoint
  }

  // check if the last purchase was the first one of the item
  function isFirstItemPurchase(level: number, buyMode: BuyMode) {
    if (level === buyMode)
      return true
    if (buyMode === 0xDEFECA && level === 25)
      return true
    return false
  }

  function totalBreakpointsMultiplier(currentLevel: number) {
    let totalMultiplier = 1
    for (const breakpoint of levelBreakpoints) {
      if (currentLevel >= breakpoint.level)
        totalMultiplier *= breakpoint.effect
      else
        break
    }
    return totalMultiplier
  }

  function nextBreakpointsList(currentLevel: number, numberOfBreakpoints: number | null = null) {
    const breakpoints: LevelBreakpoint[] = []
    const nextBreakpointIndex = levelBreakpoints.findIndex(breakpoint => breakpoint.level > currentLevel)
    if (nextBreakpointIndex === -1)
      return breakpoints
    if (numberOfBreakpoints === null)
      return levelBreakpoints.slice(nextBreakpointIndex)
    return levelBreakpoints.slice(nextBreakpointIndex, nextBreakpointIndex + numberOfBreakpoints)
  }

  function nextItemLevelCost(currentLevel: number, costBase: number, rateGrowth: number) {
    return costBase * (rateGrowth ** currentLevel)
  }

  function multipleItemLevelCost(currentLevel: number, costBase: number, rateGrowth: number, amountToBuy: number) {
    return costBase * ((rateGrowth ** currentLevel) * ((rateGrowth ** amountToBuy) - 1)) / (rateGrowth - 1)
  }

  function maxBuyableLevels(currentLevel: number, costBase: number, rateGrowth: number, money: number) {
    let buyableLevels = 0
    while (money >= multipleItemLevelCost(currentLevel, costBase, rateGrowth, buyableLevels))
      buyableLevels++

    return buyableLevels - 1
  }

  function itemRevenue(revenueBase: number, currentLevel: number, multipliers: number[] = []) {
    let revenue = revenueBase * currentLevel

    // apply breakpoints multiplier
    revenue *= totalBreakpointsMultiplier(currentLevel)

    // apply custom multipliers
    multipliers.forEach((multiplier) => {
      revenue *= multiplier
    })
    return revenue
  }

  function itemRevenuePerSecond(revenue: number, milliseconds: number) {
    return (revenue / (milliseconds / 1000))
  }

  return {
    nextItemLevelBreakpoint,
    isFirstItemPurchase,
    totalBreakpointsMultiplier,
    nextBreakpointsList,
    nextItemLevelCost,
    multipleItemLevelCost,
    maxBuyableLevels,
    itemRevenue,
    itemRevenuePerSecond,
  }
}
