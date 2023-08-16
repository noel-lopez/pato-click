export function useMoneyMaths() {
  function nextItemLevelBreakpoint(currentLevel: number) {
    const breakpoint = Math.ceil(currentLevel / 25) * 25
    if (currentLevel % 25 === 0)
      return breakpoint + 25
    return breakpoint
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

  function itemRevenue(revenueBase: number, currentLevel: number, multipliers: number[]) {
    let revenue = revenueBase * currentLevel

    // for each 25 levels, revenue x2
    const reachedBreakpoints = Math.floor(currentLevel / 25)
    for (let i = 0; i < reachedBreakpoints; i++)
      revenue *= 2

    // apply multipliers
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
    nextItemLevelCost,
    multipleItemLevelCost,
    maxBuyableLevels,
    itemRevenue,
    itemRevenuePerSecond,
  }
}
