export default defineAppConfig({
  items: {
    food: {
      name: 'Panecillos',
      description: '¡Comidita pa-tol mundo!',
      img: 'item_food.png',
      costBase: 4,
      rateGrowth: 1.07,
      time: 600,
      revenueBase: 1,
    },
    lily: {
      name: 'Nenúfar',
      description: 'Barcos en el estanque.',
      img: 'item_lily.png',
      costBase: 60,
      rateGrowth: 1.15,
      time: 3_000,
      revenueBase: 60,
    },
    divingKit: {
      name: 'Equipo de buceo',
      description: 'Patos subacuáticos.',
      img: 'item_diving_kit.png',
      costBase: 720,
      rateGrowth: 1.14,
      time: 6_000,
      revenueBase: 540,
    },
    lotus: {
      name: 'Flor de loto',
      description: 'Elegancia en el agua.',
      img: 'item_lotus.png',
      costBase: 8_640,
      rateGrowth: 1.13,
      time: 12_000,
      revenueBase: 4_320,
    },
    frog: {
      name: 'Rana',
      description: '¡Croac-avillosa compañía!',
      img: 'item_frog.png',
      costBase: 103_680,
      rateGrowth: 1.12,
      time: 24_000,
      revenueBase: 51_840,
    },
    koi: {
      name: 'Peces koi',
      description: 'Estanque de colores.',
      img: 'item_koi.png',
      costBase: 1_244_160,
      rateGrowth: 1.11,
      time: 96_000,
      revenueBase: 622_080,
    },
    fountain: {
      name: 'Fuente Aleteo',
      description: 'Sacudiendo el plumaje.',
      img: 'item_fountain.png',
      costBase: 14_929_920,
      rateGrowth: 1.10,
      time: 384_000,
      revenueBase: 7_464_960,
    },
    lantern: {
      name: 'Farolillos',
      description: 'Ambientazo nocturno.',
      img: 'item_lantern.png',
      costBase: 179_159_040,
      rateGrowth: 1.09,
      time: 1_536_000,
      revenueBase: 89_579_520,
    },
    thermalBath: {
      name: 'Baño termal',
      description: '¡Relaja tus plumas!',
      img: 'item_thermal_bath.png',
      costBase: 2_149_908_480,
      rateGrowth: 1.08,
      time: 6_144_000,
      revenueBase: 1_074_954_240,
    },
    house: {
      name: 'Casita patuna',
      description: 'Hogar pa-to\' la vida.',
      img: 'item_house.png',
      costBase: 25_798_901760,
      rateGrowth: 1.07,
      time: 36_864_000,
      revenueBase: 29_668_737_024,
    },
  },
  managers: {
    food: {
      name: 'Manager de comida',
      description: 'Encargado de alimentar automáticamente',
      img: 'manager_food.png',
      cost: 1_000,
    },
    lily: {
      name: 'Manager de nenúfares',
      description: 'Encargado de cuidar los nenúfares',
      img: 'manager_lily.png',
      cost: 15_000,
    },
    divingKit: {
      name: 'Manager de equipo de buceo',
      description: 'Encargado repartir equipos de buceo a los patos',
      img: 'manager_diving_kit.png',
      cost: 100_000,
    },
    lotus: {
      name: 'Manager de flores de loto',
      description: 'Encargado de cuidar las flores de loto',
      img: 'manager_lotus.png',
      cost: 500_000,
    },
    frog: {
      name: 'Manager de ranas',
      description: 'Encargado de cuidar las ranas',
      img: 'manager_frog.png',
      cost: 1_200_000,
    },
    koi: {
      name: 'Manager de peces koi',
      description: 'Encargado de cuidar los peces koi',
      img: 'manager_koi.png',
      cost: 10_000_000,
    },
    fountain: {
      name: 'Manager de fuentes para patos',
      description: 'Encargado de cuidar las fuentes para patos',
      img: 'manager_fountain.png',
      cost: 111_111_111,
    },
    lantern: {
      name: 'Manager de farolillos',
      description: 'Encargado de instalar farolillos en el estanque',
      img: 'manager_lantern.png',
      cost: 555_555_555,
    },
    thermalBath: {
      name: 'Manager de baños termales',
      description: 'Encargado de cuidar los baños termales',
      img: 'manager_thermal_bath.png',
      cost: 1_0000_000_000,
    },
    house: {
      name: 'Manager de casas para patos',
      description: 'Encargado de cuidar las casas para patos',
      img: 'manager_house.png',
      cost: 100_000_000_000,
    },
  },
  upgrades: {
    food_1: {
      item: 'food',
      name: 'Comida de calidad',
      description: 'Aumenta la eficiencia de la comida de los patos x3',
      cost: 250_000,
      effect: 3,
    },
    lily_1: {
      item: 'lily',
      name: 'Nenúfares ergonómicos',
      description: 'Aumenta la eficiencia de los nenúfares x3',
      cost: 500_000,
      effect: 3,
    },
    divingKit_1: {
      item: 'divingKit',
      name: 'Equipo de buceo de calidad',
      description: 'Aumenta la eficiencia del equipo de buceo x3',
      cost: 1_000_000,
      effect: 3,
    },
    lotus_1: {
      item: 'lotus',
      name: 'Flores de loto despampanantes',
      description: 'Aumenta la eficiencia de las flores de loto x3',
      cost: 5_000_000,
      effect: 3,
    },
    frog_1: {
      item: 'frog',
      name: 'Ranas de la suerte',
      description: 'Aumenta la eficiencia de las ranas x3',
      cost: 10_000_000,
      effect: 3,
    },
    koi_1: {
      item: 'koi',
      name: 'Peces koi gigantes',
      description: 'Aumenta la eficiencia de los peces koi x3',
      cost: 25_000_000,
      effect: 3,
    },
    fountain_1: {
      item: 'fountain',
      name: 'Fuentes para patos de 50L',
      description: 'Aumenta la eficiencia de las fuentes para patos x3',
      cost: 500_000_000,
      effect: 3,
    },
    lantern_1: {
      item: 'lantern',
      name: 'Farolillos de lujo',
      description: 'Aumenta la eficiencia de los farolillos x3',
      cost: 10_000_000_000,
      effect: 3,
    },
    thermalBath_1: {
      item: 'thermalBath',
      name: 'Baños termales calentitos',
      description: 'Aumenta la eficiencia de los baños termales x3',
      cost: 50_000_000_000,
      effect: 3,
    },
    house_1: {
      item: 'house',
      name: 'Mansiones para patos',
      description: 'Aumenta la eficiencia de las casas para patos x3',
      cost: 250_000_000_000,
      effect: 3,
    },
    pond_1: {
      item: 'ALL',
      name: 'Estanque renovado',
      description: 'Aumenta la eficiencia de todos los objetos x3',
      cost: 1_000_000_000_000,
      effect: 3,
    },
  },
  achievements: {
    cash: {
      100: {
        name: 'Aspirante a patodólars',
        description: 'Consigue tus primeras 100 patomonedas',
      },
      50_000: {
        name: 'Mentor de patitos',
        description: 'Consigue 50.000 patomonedas',
      },
      100_000: {
        name: 'Lord Patoso',
        description: 'Consigue 100.000 patomonedas',
      },
      1_000_000: {
        name: 'Millonario de plumitas',
        description: 'Consigue 1.000.000 patomonedas',
      },
      500_000_000: {
        name: 'Campeón del chapoteo',
        description: 'Consigue 500 millones de patomonedas',
      },
      1_000_000_000: {
        name: 'Emperador de la pluma',
        description: 'Consigue 1.000 millones de patomonedas',
      },
      1_000_000_000_000: {
        name: 'Quacker mágico',
        description: 'Consigue 1 billón de patomonedas',
      },
      10_000_000_000_000: {
        name: 'Rey de la charca',
        description: 'Consigue 10 billones de patomonedas',
      },
      1_000_000_000_000_000: {
        name: 'Maestro del Cuack',
        description: 'Consigue 1 trillón de patomonedas',
      },
    },
    itemLevel: {
      food_25: {
        name: 'Festín patoso',
        description: 'Nivel 25 de Panecillos!',
      },
      food_50: {
        name: 'Banquete acuático',
        description: 'Nivel 50 de Panecillos!',
      },
      food_100: {
        name: 'Maestro Chef de Patos',
        description: 'Nivel 100 de Panecillos!',
      },
      food_200: {
        name: 'Pato Gourmet',
        description: 'Nivel 200 de Panecillos!',
      },
      lily_25: {
        name: 'Salto inicial',
        description: 'Nivel 25 de Nenúfar!',
      },
      lily_50: {
        name: 'Paseo Flotante',
        description: 'Nivel 50 de Nenúfar!',
      },
      lily_100: {
        name: 'Jardín de Patos',
        description: 'Nivel 100 de Nenúfar!',
      },
      lily_200: {
        name: 'Maestro de los estanques',
        description: 'Nivel 200 de Nenúfar!',
      },
      divingKit_25: {
        name: 'Buceo Inicial',
        description: 'Nivel 25 de Equipo de buceo!',
      },
      divingKit_50: {
        name: 'Submarinista Patoso',
        description: 'Nivel 50 de Equipo de buceo!',
      },
      divingKit_100: {
        name: 'Ducktonauta acuático',
        description: 'Nivel 100 de Equipo de buceo!',
      },
      divingKit_200: {
        name: 'Explorador subacuático',
        description: 'Nivel 200 de Equipo de buceo!',
      },
      lotus_25: {
        name: 'Loto Naciente',
        description: 'Nivel 25 de Flor de loto!',
      },
      lotus_50: {
        name: 'Jardín floral',
        description: 'Nivel 50 de Flor de loto!',
      },
      lotus_100: {
        name: 'Cultivador de paz',
        description: 'Nivel 100 de Flor de loto!',
      },
      lotus_200: {
        name: 'Emperador del estanque',
        description: 'Nivel 200 de Flor de loto!',
      },
      frog_25: {
        name: 'Pato saltarín',
        description: 'Ranita nivel 25!',
      },
      frog_50: {
        name: 'Amigo anfibio',
        description: 'Ranita nivel 50!',
      },
      frog_100: {
        name: 'Soberano de los sapos',
        description: 'Ranita nivel 100!',
      },
      frog_200: {
        name: 'Reino de los saltos',
        description: 'Ranita nivel 200!',
      },
      koi_25: {
        name: 'Estanque oriental',
        description: 'Nivel 25 de Peces koi!',
      },
      koi_50: {
        name: 'Acuario viviente',
        description: 'Nivel 50 de Peces koi!',
      },
      koi_100: {
        name: 'Zen acuático',
        description: 'Nivel 100 de Peces koi!',
      },
      koi_200: {
        name: 'Dragón dorado',
        description: 'Nivel 200 de Peces koi!',
      },
      fountain_25: {
        name: 'Gotas de diversión',
        description: 'Nivel 25 de Fuente Aleteo!',
      },
      fountain_50: {
        name: 'Parque acuático',
        description: 'Nivel 50 de Fuente Aleteo!',
      },
      fountain_100: {
        name: 'Cascada de patos',
        description: 'Nivel 100 de Fuente Aleteo!',
      },
      fountain_200: {
        name: 'Maestro de las aguas',
        description: 'Nivel 200 de Fuente Aleteo!',
      },
      lantern_25: {
        name: 'Iluminador nocturno',
        description: 'Nivel 25 de Farolillos!',
      },
      lantern_50: {
        name: 'Sendero Luminoso',
        description: 'Nivel 50 de Farolillos!',
      },
      lantern_100: {
        name: 'Festival de luces',
        description: 'Nivel 100 de Farolillos!',
      },
      lantern_200: {
        name: 'Maestro de la luz',
        description: 'Nivel 200 de Farolillos!',
      },
      thermalBath_25: {
        name: 'Relax acuático',
        description: 'Nivel 25 de Baño termal!',
      },
      thermalBath_50: {
        name: 'Spa de plumitas',
        description: 'Nivel 50 de Baño termal!',
      },
      thermalBath_100: {
        name: 'Ducktástico Descanso',
        description: 'Nivel 100 de Baño termal!',
      },
      thermalBath_200: {
        name: 'Maestro del baño',
        description: 'Nivel 200 de Baño termal!',
      },
      house_25: {
        name: 'Pato de alquiler',
        description: 'Nivel 25 de Casita patuna!',
      },
      house_50: {
        name: 'Hogar acolchado',
        description: 'Nivel 50 de Casita patuna!',
      },
      house_100: {
        name: 'Nido de Comodidad',
        description: 'Nivel 100 de Casita patuna!',
      },
      house_200: {
        name: 'Palacio de plumas',
        description: 'Nivel 200 de Casita patuna!',
      },
    },
    easteregg: {
      konami: {
        name: 'El KonamiPato',
        description: 'Conseguido por introducir el código Konami',
      },
    },
    rare: {
      top1: {
        name: 'Top #1 Mundial!',
        description: 'Conseguido por ser el top #1 mundial',
      },
      allAchievements: {
        name: 'Todos los logros!',
        description: 'Conseguido por conseguir todos los logros',
      },
      kuroJam: {
        name: 'KuroJam',
        description: 'Conseguido por jugar durante la KuroJam',
      },
    },
  },
  skins: {
    default: {
      name: 'Pato',
      description: 'Pato tonto',
      img: 'skin_default.png',
    },
    defaultBrown: {
      name: 'Pato marrón',
      description: 'Pato con manchitas blancas',
      img: 'skin_default_brown.png',
    },
    frog: {
      name: 'RanaPato',
      description: 'Mejor amigo de la ranita del estanque',
      img: 'skin_frog.png',
    },
    kuro: {
      name: 'KuroPato',
      description: 'Pato streamer de programación',
      img: 'skin_kuro.png',
    },
  },
})
