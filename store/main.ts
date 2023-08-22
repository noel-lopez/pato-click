// import { persistedState } from 'pinia-plugin-persistedstate'
import type { AchievementType, AchievementsConfig, ItemKey } from 'index'
import { defineStore } from 'pinia'

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
  const userCash = ref(4)
  const moneySpent = ref(0)

  const buyMode = ref<1 | 10 | 100 | 0xDEFECA>(1)
  const userSkin = ref<SkinId>('default')
  const itemLevels = ref<ItemLevelsRef>({
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
  const itemMultipliers = ref<ItemMultipliersRef>({
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
  const purchasedManagers = ref<ItemKey[]>([])
  const purchasedUpgrades = ref<UpgradeId[]>([])
  const earnedAchievements = ref<AchievementId[]>([])
  const earnedSkins = ref<SkinId[]>([])

  // COMPOSABLES
  const staticData = useAppConfig()
  const {
    itemRevenue: calcItemRevenue,
    itemRevenuePerSecond: calcItemRevenuePerSecond,
    nextItemLevelCost: calcNextItemLevelCost,
    multipleItemLevelCost: calcMultipleItemLevelCost,
    maxBuyableLevels: calcMaxBuyableLevels,
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
  // const skinConfig = (skinId: SkinId) => staticData.skins[skinId]

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
    const item = itemConfig(itemName)
    const level = itemLevel(itemName)
    if (buyMode.value === 1)
      return 1
    if (buyMode.value === 0xDEFECA) {
      const maxBuyableLevels = calcMaxBuyableLevels(level, item.costBase, item.rateGrowth, userCash.value)
      return maxBuyableLevels
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

  const earnedCash = computed(() => {
    return moneySpent.value + userCash.value
  })

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
    managerIsPurchased,
    upgradeIsPurchased,
    achievementIsEarned,
    skinIsEarned,
    unpurchasedManagersList,
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
  }
})
