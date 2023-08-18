// import { persistedState } from 'pinia-plugin-persistedstate'
import type { AchievementType, ItemKey } from 'index'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  // DATA TYPES
  type UpgradeId = keyof typeof staticData.upgrades
  type SkinId = keyof typeof staticData.skins
  type AchievementId = keyof typeof staticData.achievements[AchievementType]
  type ItemLevelsRef = {
    [itemId in ItemKey]: number
  }
  type ItemMultipliersRef = {
    [itemId in ItemKey]: number[]
  }

  // STATE
  const cash = ref(4)
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
    getLevelBreakpointsList,
  } = useMoneyMaths()

  // BASIC GETTERS
  const itemLevel = (itemId: ItemKey) => itemLevels.value[itemId]
  const managerIsPurchased = (managerId: ItemKey) => purchasedManagers.value.includes(managerId)
  const upgradeIsPurchased = (upgradeId: UpgradeId) => purchasedUpgrades.value.includes(upgradeId)
  const achievementIsEarned = (achievementId: AchievementId) => earnedAchievements.value.includes(achievementId)
  const skinIsEarned = (skinId: SkinId) => earnedSkins.value.includes(skinId)
  const itemConfig = (itemId: ItemKey) => staticData.items[itemId]
  const managerConfig = (managerId: ItemKey) => staticData.managers[managerId]
  const upgradeConfig = (upgradeId: UpgradeId) => staticData.upgrades[upgradeId]
  /* const achievementConfig = <T extends AchievementType, K extends keyof typeof staticData.achievements[T]>(
    type: T,
    id: K,
  ) => staticData.achievements[type][id]
  const skinConfig = (skinId: SkinId) => staticData.skins[skinId] */

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

  const itemLevelBreakpointsList = (itemName: ItemKey) => {
    const level = itemLevel(itemName)
    return getLevelBreakpointsList(level)
  }

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

  const nextItemLevelCost = (itemName: ItemKey) => {
    const item = itemConfig(itemName)
    const level = itemLevel(itemName)
    return calcNextItemLevelCost(level, item.costBase, item.rateGrowth)
  }

  // ACTIONS
  const addCash = (amount: number) => {
    cash.value += amount
  }

  const spendCash = (amount: number) => {
    cash.value -= amount
  }

  const purchaseItemLevel = (itemName: ItemKey) => {
    const cost = nextItemLevelCost(itemName)
    spendCash(cost)
    itemLevels.value[itemName]++
  }

  const purchaseManager = (managerId: ItemKey) => {
    const manager = managerConfig(managerId)
    spendCash(manager.cost)
    purchasedManagers.value.push(managerId)
  }

  const purchaseUpgrade = (upgradeId: UpgradeId) => {
    const upgrade = upgradeConfig(upgradeId)
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
    cash,
    userSkin,
    itemLevel,
    managerIsPurchased,
    upgradeIsPurchased,
    achievementIsEarned,
    skinIsEarned,
    unpurchasedManagersList,
    unpurchasedUpgradesList,
    skinsList,
    itemLevelBreakpointsList,
    itemIsAutomatic,
    itemRevenue,
    itemRevenuePerSecond,
    nextItemLevelCost,
    addCash,
    purchaseItemLevel,
    purchaseManager,
    purchaseUpgrade,
    earnAchievement,
    earnSkin,
  }
})
