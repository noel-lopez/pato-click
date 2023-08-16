export interface BaseItem {
  /** Name of the item */
  name: string
  /** Description of the item */
  description: string
  /** Relative image path of the item */
  img: string
}

export interface ItemConfig extends BaseItem {
  /** cost per item  */
  costBase: number
  /** growth per item  */
  rateGrowth: number
  time: number
  revenueBase: number
}

interface ManagersConfig extends BaseItem {
  cost: number
}

interface UpgradesConfig extends Omit<BaseItem, 'img'> {
  item: string
  cost: number
  effect: number
}

type AchievementType = 'currency' | 'item' | 'easteregg' | 'rare'

interface AchievementsConfig extends Omit<BaseItem, 'img'> {
}

interface SkinsConfig extends BaseItem {
}

declare module "nuxt/schema" {
  interface AppConfigInput {
    items: {
      [itemName: string]: ItemConfig
    },
    managers: {
      [K in keyof AppConfigInput['items']]: ManagersConfig
    }
    upgrades: Array<UpgradesConfig>
    achievements: {
      [T in AchievementType]: {
        [achievementName: string]: AchievementsConfig
      }
    }
    skins: {
      [skinName: string]: SkinsConfig
    }
  }
}

export { }