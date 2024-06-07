export interface Receta {
    id: number | null,
    nombre: string,
    imagen: string,
    categoria: Categoria,
    area: string,
    ingredientes: {[nombre: string]: string},
    preparacion: string,
    guardada: boolean
}

export enum Categoria {
    BEEF = "Beef",
    BREAKFAST = "Breakfast",
    CHICKEN = "Chicken",
    DESSERT = "Dessert",
    GOAT = "Goat",
    LAMB = "Lamb",
    MISCELLANEOUS = "Miscellaneous",
    PASTA = "Pasta",
    PORK = "Pork",
    SEAFOOD = "Seafood",
    SIDE = "Side",
    STARTER = "Starter",
    VEGAN = "Vegan",
    VEGETARIAN = "Vegetarian"
}