const levelBreakpoints = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,
  1800, 1900, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000, 4250, 4500, 4750, 5000, 5250, 5500, 5750, 6000, 6250, 6500,
  6750, 7000, 7250, 7500, 7777, 8000, 8200, 8400, 8600, 8800, 9000, 9100, 9200, 9300, 9400, 9500, 9600, 9700, 9800, 9999, 10000]

export function useMoneyMaths() {
  function nextItemLevelBreakpoint(currentLevel: number) {
    let nextBreakpoint = 0
    levelBreakpoints.forEach((breakpoint) => {
      if (currentLevel < breakpoint && nextBreakpoint === 0)
        nextBreakpoint = breakpoint
    })
    return nextBreakpoint
  }

  function getLevelBreakpointsList(currentLevel: number) {
    return levelBreakpoints.map((breakpoint) => {
      return {
        level: breakpoint,
        reached: currentLevel >= breakpoint,
      }
    })
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

  function reachedBreakpointsQuantity(currentLevel: number) {
    let reachedBreakpoints = 0
    for (const breakpoint of levelBreakpoints) {
      if (currentLevel >= breakpoint)
        reachedBreakpoints++
      else
        break
    }
    return reachedBreakpoints
  }

  function itemRevenue(revenueBase: number, currentLevel: number, multipliers: number[] = []) {
    let revenue = revenueBase * currentLevel

    // apply x2 multiplier for every reached breakpoint
    const reachedBreakpoints = reachedBreakpointsQuantity(currentLevel)
    revenue *= 2 ** reachedBreakpoints

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
    getLevelBreakpointsList,
    nextItemLevelCost,
    multipleItemLevelCost,
    maxBuyableLevels,
    itemRevenue,
    itemRevenuePerSecond,
  }
}
