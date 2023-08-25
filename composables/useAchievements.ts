import type { AchievementType } from 'index'
import { usePush } from './useNotivue'
import { useStore } from '~/store/main'

export function useAchievements() {
  const staticData = useAppConfig()
  const store = useStore()
  const push = usePush()

  type AchievementId = {
    [T in keyof typeof staticData.achievements]: keyof typeof staticData.achievements[T];
  }[keyof typeof staticData.achievements]

  const pushCashAchievement = (id: keyof typeof staticData.achievements['cash']) => {
    pushAchievement('cash', id)
  }

  const pushItemAchievement = (id: keyof typeof staticData.achievements['itemLevel']) => {
    pushAchievement('itemLevel', id)
  }

  const pushEasteregg = (id: keyof typeof staticData.achievements['easteregg']) => {
    pushAchievement('easteregg', id)
  }

  const pushRare = (id: keyof typeof staticData.achievements['rare']) => {
    pushAchievement('rare', id)
  }

  const checkAllAchievements = () => {
    const totalLength = Object.keys(staticData.achievements).reduce((acc, type) => {
      return acc + Object.keys(staticData.achievements[type as AchievementType]).length
    }, 0)
    const lengthNeeded = store.achievementIsEarned('kuroJam') ? totalLength - 1 : totalLength - 2
    const earnedLength = store.earnedAchievementsCount
    if (earnedLength === lengthNeeded)
      pushRare('allAchievements')
  }

  const checkAditionalReward = (id: AchievementId) => {
    if (id === 'kuroJam')
      store.earnSkin('kuro')
    if (id === '100')
      store.earnSkin('defaultBrown')
    if (id === 'frog_25')
      store.earnSkin('frog')
  }

  // MAIN FUNCTION
  function pushAchievement<T extends AchievementType, K extends keyof typeof staticData.achievements[T]>(
    type: T,
    id: K,
  ) {
    const achievementData = store.achievementInfo(type, id)
    if (store.achievementIsEarned(id as AchievementId))
      return
    store.earnAchievement(id as AchievementId)
    checkAllAchievements()
    checkAditionalReward(id as AchievementId)
    push.success({
      title: achievementData.name,
      message: achievementData.description,
      props: {
        img: achievementData.img,
        type,
      },
    })
  }

  // #region CASH ACHIEVEMENTS
  watch(
    () => store.cashNumber,
    (cash) => {
      if (cash >= 100)
        pushCashAchievement('100')
      if (cash >= 50_000)
        pushCashAchievement('50k')
      if (cash >= 100_000)
        pushCashAchievement('100k')
      if (cash >= 1_000_000)
        pushCashAchievement('1M')
      if (cash >= 500_000_000)
        pushCashAchievement('500M')
      if (cash >= 1_000_000_000)
        pushCashAchievement('1KM')
      if (cash >= 1_000_000_000_000)
        pushCashAchievement('1B')
      if (cash >= 10_000_000_000_000)
        pushCashAchievement('10B')
      if (cash >= 1_000_000_000_000_000)
        pushCashAchievement('1T')
    },
  )
  // #endregion

  // #region ITEM LEVEL ACHIEVEMENTS
  // #1 food
  watch(
    () => store.itemLevel('food'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('food_25')
      if (level >= 50)
        pushItemAchievement('food_50')
      if (level >= 100)
        pushItemAchievement('food_100')
      if (level >= 200)
        pushItemAchievement('food_200')
    },
  )
  // #2 lily
  watch(
    () => store.itemLevel('lily'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('lily_25')
      if (level >= 50)
        pushItemAchievement('lily_50')
      if (level >= 100)
        pushItemAchievement('lily_100')
      if (level >= 200)
        pushItemAchievement('lily_200')
    },
  )
  // #3 divingKit
  watch(
    () => store.itemLevel('divingKit'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('divingKit_25')
      if (level >= 50)
        pushItemAchievement('divingKit_50')
      if (level >= 100)
        pushItemAchievement('divingKit_100')
      if (level >= 200)
        pushItemAchievement('divingKit_200')
    },
  )
  // #4 lotus
  watch(
    () => store.itemLevel('lotus'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('lotus_25')
      if (level >= 50)
        pushItemAchievement('lotus_50')
      if (level >= 100)
        pushItemAchievement('lotus_100')
      if (level >= 200)
        pushItemAchievement('lotus_200')
    },
  )
  // #5 frog
  watch(
    () => store.itemLevel('frog'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('frog_25')
      if (level >= 50)
        pushItemAchievement('frog_50')
      if (level >= 100)
        pushItemAchievement('frog_100')
      if (level >= 200)
        pushItemAchievement('frog_200')
    },
  )
  // #6 koi
  watch(
    () => store.itemLevel('koi'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('koi_25')
      if (level >= 50)
        pushItemAchievement('koi_50')
      if (level >= 100)
        pushItemAchievement('koi_100')
      if (level >= 200)
        pushItemAchievement('koi_200')
    },
  )
  // #7 fountain
  watch(
    () => store.itemLevel('fountain'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('fountain_25')
      if (level >= 50)
        pushItemAchievement('fountain_50')
      if (level >= 100)
        pushItemAchievement('fountain_100')
      if (level >= 200)
        pushItemAchievement('fountain_200')
    },
  )
  // #8 lantern
  watch(
    () => store.itemLevel('lantern'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('lantern_25')
      if (level >= 50)
        pushItemAchievement('lantern_50')
      if (level >= 100)
        pushItemAchievement('lantern_100')
      if (level >= 200)
        pushItemAchievement('lantern_200')
    },
  )
  // #9 thermalBath
  watch(
    () => store.itemLevel('thermalBath'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('thermalBath_25')
      if (level >= 50)
        pushItemAchievement('thermalBath_50')
      if (level >= 100)
        pushItemAchievement('thermalBath_100')
      if (level >= 200)
        pushItemAchievement('thermalBath_200')
    },
  )
  // #10 house
  watch(
    () => store.itemLevel('house'),
    (level) => {
      if (level >= 25)
        pushItemAchievement('house_25')
      if (level >= 50)
        pushItemAchievement('house_50')
      if (level >= 100)
        pushItemAchievement('house_100')
      if (level >= 200)
        pushItemAchievement('house_200')
    },
  )
  // #endregion

  // #region KONAMI CODE WATCHER
  const kode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
  const konamiCode = ref('')
  const checkKonamiCode = () => {
    if (konamiCode.value === kode.join('')) {
      pushEasteregg('konami')
      konamiCode.value = ''
    }
  }
  const keyDownEventHandler = (e: KeyboardEvent) => {
    if (!kode.includes(e.code)) {
      konamiCode.value = ''
      return
    }
    const newKonamiCode = konamiCode.value + e.code
    if (!kode.join('').startsWith(newKonamiCode)) {
      konamiCode.value = e.code
    }
    else {
      konamiCode.value = newKonamiCode
      checkKonamiCode()
    }
  }
  onMounted(() => {
    window.addEventListener('keydown', keyDownEventHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', keyDownEventHandler)
  })
  // #endregion
  // pushRare('kuroJam') -> removed after the jam
}
