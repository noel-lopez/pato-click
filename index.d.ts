export interface BaseItem {
  name: string
  description: string
  img: string
}

export interface ItemConfig extends BaseItem {
  costBase: number
  rateGrowth: number
  time: number
  revenueBase: number
}

export type ItemKey = 'food' | 'lily' | 'divingKit' | 'lotus' | 'frog' | 'koi' | 'fountain' | 'lantern' | 'thermalBath' | 'house'

export interface ManagerConfig extends BaseItem {
  cost: number
}

export interface UpgradeConfig extends Omit<BaseItem, 'img'> {
  item: ItemKey | 'ALL'
  cost: number
  effect: number
}

export type AchievementType = 'cash' | 'itemLevel' | 'easteregg' | 'rare'

export interface AchievementsConfig extends BaseItem {
}

export interface SkinsConfig extends BaseItem {
}

export type BuyMode = 1 | 10 | 100 | 0xDEFECA

declare module "nuxt/schema" {
  interface AppConfigInput {
    items: {
      [itemName: ItemKey]: ItemConfig
    },
    managers: {
      [K in keyof AppConfigInput['items']]: ManagerConfig
    }
    upgrades: {
      [upgradeId: string]: UpgradeConfig
    }
    achievements: {
      [achievementType in AchievementType]: {
        [achievementId: string]: AchievementsConfig
      }
    }
    skins: {
      [skinName: string]: SkinsConfig
    }
  }
}

export { }