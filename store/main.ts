import type { AchievementType, AchievementsConfig, BuyMode, ItemKey } from 'index'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

function ls<T>(id: string, defaultValue: T): Ref<T> {
  return useLocalStorage(id, defaultValue)
}

export const useStore = defineStore('main', () => {
  // DATA TYPES
  type UpgradeId = keyof typeof staticData.upgrades
  type SkinId = keyof typeof staticData.skins
  type AchievementId = {
    [T in keyof typeof staticData.achievements]: keyof typeof staticData.achievements[T];
  }[keyof typeof staticData.achievements]

  type ItemLevelsRef = {
    [itemId in ItemKey]: number
  }
  type ItemMultipliersRef = {
    [itemId in ItemKey]: number[]
  }

  // STATE
  const userCash = ls<number>('pato-user-cash', 4)
  const moneySpent = ls<number>('pato-money-spent', 0)

  const buyMode = ref<BuyMode>(1)
  const userSkin = ls<SkinId>('pato-user-skin', 'default')
  const itemLevels = ls<ItemLevelsRef>('pato-item-levels', {
    food: 0,
    lily: 0,
    divingKit: 0,
    lotus: 0,
    frog: 0,
    koi: 0,
    fountain: 0,
    lantern: 0,
    thermalBath: 0,
    house: 0,
  })
  const itemMultipliers = ls<ItemMultipliersRef>('pato-item-multipliers', {
    food: [],
    lily: [],
    divingKit: [],
    lotus: [],
    frog: [],
    koi: [],
    fountain: [],
    lantern: [],
    thermalBath: [],
    house: [],
  })
  const purchasedManagers = ls<ItemKey[]>('pato-purchased-managers', [])
  const purchasedUpgrades = ls<UpgradeId[]>('pato-purchased-upgrades', [])
  const earnedAchievements = ls<AchievementId[]>('pato-earned-achievements', [])
  const earnedSkins = ls<SkinId[]>('pato-earned-skins', ['default'])

  // COMPOSABLES
  const staticData = useAppConfig()
  const {
    itemRevenue: calcItemRevenue,
    itemRevenuePerSecond: calcItemRevenuePerSecond,
    nextItemLevelCost: calcNextItemLevelCost,
    multipleItemLevelCost: calcMultipleItemLevelCost,
    nextItemLevelBreakpoint: calcNextItemLevelBreakpoint,
  } = useMoneyMaths()
  const { currencyToString } = useFormat()
  // BASIC GETTERS
  const cash = computed(() => currencyToString(userCash.value))
  const earnedAchievementsCount = computed(() => earnedAchievements.value.length)
  const itemLevelsCount = computed(() => Object.values(itemLevels.value).reduce((a, b) => a + b, 0))
  const isPurchaseable = (cost: number) => userCash.value >= cost
  const itemLevel = (itemId: ItemKey) => itemLevels.value[itemId]
  const managerIsPurchased = (managerId: ItemKey) => purchasedManagers.value.includes(managerId)
  const upgradeIsPurchased = (upgradeId: UpgradeId) => purchasedUpgrades.value.includes(upgradeId)
  const achievementIsEarned = (achievementId: AchievementId) => earnedAchievements.value.includes(achievementId)
  const skinIsEarned = (skinId: SkinId) => earnedSkins.value.includes(skinId)
  const itemConfig = (itemId: ItemKey) => staticData.items[itemId]
  const managerConfig = (managerId: ItemKey) => staticData.managers[managerId]
  const upgradeConfig = (upgradeId: UpgradeId) => staticData.upgrades[upgradeId]
  const achievementConfig = <T extends AchievementType, K extends keyof typeof staticData.achievements[T]>(
    type: T,
    id: K,
  ): AchievementsConfig => staticData.achievements[type][id]
  const skinConfig = (skinId: SkinId) => staticData.skins[skinId]
  const earnedCash = computed(() => {
    return moneySpent.value + userCash.value
  })

  // LIST GETTERS
  const unpurchasedManagersList = computed(() => {
    return Object.entries(staticData.managers).filter(([managerId]) => {
      return !managerIsPurchased(managerId as ItemKey)
    }).map(([managerId, manager]) => {
      return {
        id: managerId as ItemKey,
        ...manager,
      }
    })
  })

  const purchasedManagersList = computed(() => {
    return Object.entries(staticData.managers).filter(([managerId]) => {
      return managerIsPurchased(managerId as ItemKey)
    }).map(([managerId, manager]) => {
      return {
        id: managerId as ItemKey,
        ...manager,
      }
    })
  })

  const unpurchasedUpgradesList = computed(() => {
    return Object.entries(staticData.upgrades).filter(([upgradeId]) => {
      return !upgradeIsPurchased(upgradeId as UpgradeId)
    }).map(([upgradeId, upgrade]) => {
      return {
        id: upgradeId as UpgradeId,
        ...upgrade,
      }
    })
  })

  const skinsList = computed(() => {
    return Object.entries(staticData.skins).map(([skinId, skin]) => {
      return {
        id: skinId as SkinId,
        isEarned: skinIsEarned(skinId as SkinId),
        ...skin,
      }
    })
  })

  const achievementsList = computed(() => {
    return Object.entries(staticData.achievements).map(([type, achievements]) => {
      return {
        type: type as AchievementType,
        achievements: Object.entries(achievements).map(([achievementId, achievement]) => {
          return {
            id: achievementId as AchievementId,
            type: type as AchievementType,
            isEarned: achievementIsEarned(achievementId as AchievementId),
            ...achievement,
          }
        }),
      }
    })
  })

  // COMPLEX GETTERS
  const itemIsAutomatic = (itemName: ItemKey) => {
    return managerIsPurchased(itemName)
  }

  const itemRevenue = (itemName: ItemKey) => {
    const item = itemConfig(itemName)
    const level = itemLevel(itemName)
    const multipliers = itemMultipliers.value[itemName]
    return calcItemRevenue(item.revenueBase, level, multipliers)
  }

  const itemRevenuePerSecond = (itemName: ItemKey) => {
    const revenue = itemRevenue(itemName)
    const item = itemConfig(itemName)
    return calcItemRevenuePerSecond(revenue, item.time)
  }

  const itemLevelQuantityToBuy = (itemName: ItemKey) => {
    const level = itemLevel(itemName)
    if (buyMode.value === 1)
      return 1
    if (buyMode.value === 0xDEFECA) {
      const nextBreakpoint = calcNextItemLevelBreakpoint(level)
      if (nextBreakpoint === 0) // reached last breakpoint (lvl 10.000)
        return 0
      return nextBreakpoint - level
    }
    return buyMode.value
  }

  const nextItemLevelCost = (itemName: ItemKey) => {
    const item = itemConfig(itemName)
    const level = itemLevel(itemName)
    if (buyMode.value === 1)
      return calcNextItemLevelCost(level, item.costBase, item.rateGrowth)
    const quantity = itemLevelQuantityToBuy(itemName)
    return calcMultipleItemLevelCost(level, item.costBase, item.rateGrowth, quantity)
  }

  // ACTIONS
  const addCash = (amount: number) => {
    userCash.value += amount
  }

  const spendCash = (amount: number) => {
    userCash.value -= amount
    moneySpent.value += amount
  }

  const selectSkin = (skinId: SkinId) => {
    if (!skinIsEarned(skinId))
      return
    userSkin.value = skinId
  }

  const purchaseItemLevel = (itemName: ItemKey) => {
    const cost = nextItemLevelCost(itemName)
    if (!isPurchaseable(cost))
      return
    spendCash(cost)
    const levelsPurchased = itemLevelQuantityToBuy(itemName)
    itemLevels.value[itemName] += levelsPurchased
  }

  const purchaseManager = (managerId: ItemKey) => {
    const manager = managerConfig(managerId)
    if (!isPurchaseable(manager.cost))
      return
    spendCash(manager.cost)
    purchasedManagers.value.push(managerId)
  }

  const purchaseUpgrade = (upgradeId: UpgradeId) => {
    const upgrade = upgradeConfig(upgradeId)
    if (!isPurchaseable(upgrade.cost))
      return
    spendCash(upgrade.cost)
    purchasedUpgrades.value.push(upgradeId)
    if (upgrade.item === 'ALL') {
      Object.keys(itemMultipliers.value).forEach((itemKey) => {
        const itemId = itemKey as ItemKey
        itemMultipliers.value[itemId].push(upgrade.effect)
      })
    }
    else {
      itemMultipliers.value[upgrade.item].push(upgrade.effect)
    }
  }

  const earnAchievement = (achievementId: AchievementId) => {
    earnedAchievements.value.push(achievementId)
  }

  const earnSkin = (skinId: SkinId) => {
    earnedSkins.value.push(skinId)
  }

  // RETURN
  return {
    buyMode,
    cashNumber: userCash,
    cash,
    earnedCash,
    earnedAchievementsCount,
    itemLevelsCount,
    moneySpent,
    isPurchaseable,
    userSkin,
    itemLevel,
    achievementInfo: achievementConfig,
    skinInfo: skinConfig,
    managerIsPurchased,
    upgradeIsPurchased,
    achievementIsEarned,
    skinIsEarned,
    unpurchasedManagersList,
    purchasedManagersList,
    unpurchasedUpgradesList,
    skinsList,
    achievementsList,
    itemIsAutomatic,
    itemRevenue,
    itemRevenuePerSecond,
    nextItemLevelCost,
    itemLevelQuantityToBuy,
    addCash,
    purchaseItemLevel,
    purchaseManager,
    purchaseUpgrade,
    earnAchievement,
    earnSkin,
    selectSkin,
  }
})
