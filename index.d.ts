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

interface ManagersConfig extends BaseItem {
  cost: number
}

interface UpgradesConfig extends Omit<BaseItem, 'img'> {
  item: ItemKey | 'ALL'
  cost: number
  effect: number
}

export type AchievementType = 'cash' | 'itemLevel' | 'easteregg' | 'rare'

interface AchievementsConfig extends Omit<BaseItem, 'img'> {
}

interface SkinsConfig extends BaseItem {
}

declare module "nuxt/schema" {
  interface AppConfigInput {
    items: {
      [itemName: ItemKey]: ItemConfig
    },
    managers: {
      [K in keyof AppConfigInput['items']]: ManagersConfig
    }
    upgrades: {
      [upgradeId: string]: UpgradesConfig
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