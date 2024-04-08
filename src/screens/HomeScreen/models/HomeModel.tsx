export enum OS {
  linux = 'linux',
  apple = 'apple',
  microsoft = 'microsoft-windows'
}

export interface GameInfo {
  id: string | number[],
  name: string,
  os: Array<OS>,
  price: number,
  discount: number,
  img: string,
  date: string,
}

export const initGameForm: GameInfo = {
  id: '',
  name: '',
  os: new Array<OS>(),
  price: 0,
  discount: 0,
  img: '',
  date: new Date().toDateString(),
}

export const games: GameInfo[] = [
  {
    id: "1",
    name: "The Legend of Zelda: Breath of the Wild",
    os: [OS.microsoft, OS.apple],
    price: 59.99,
    discount: 0,
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTvv7AdnDOiUfeZAH4NWSNPqjMss3NSuo7nISf7Y3k4bskoR0ok",
    date: new Date().toDateString(),
  },
  {
    id: "2",
    name: "Super Mario Odyssey",
    os: [OS.linux],
    price: 59.99,
    discount: 0,
    img: "https://storegamesecuador.com/files/images/productos/1644882134-1637878223-super-mario-odyssey.jpg",
    date: new Date().toDateString(),
  },
  {
    id: "3",
    name: "The Witcher 3: Wild Hunt",
    os: [OS.microsoft, OS.linux],
    price: 39.99,
    discount: 0,
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/220px-Witcher_3_cover_art.jpg",
    date: new Date().toDateString(),
  },
];