interface BaseItem {
    /** Name of the item */
    name: string
    /** Description of the item */
    description: string
    /** Relative image path of the item */
    img: string
}

interface ItemConfig extends BaseItem {
  /** cost per item  */
  costBase: BigInt
  /** growth per item  */
  rateGrowth: number
  time: number
  revenueBase: BigInt
}

interface ManagersConfig extends BaseItem {
  cost: BigInt
}

interface UpgradesConfig extends Omit<BaseItem, 'img'> {
  item: string
  cost: BigInt
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

export {}