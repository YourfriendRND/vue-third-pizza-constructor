import doughSizes from '../data/doughSizes';
import ingredients from '../data/ingredients';
import sauces from '../data/sauces';
import sizes from '../data/sizes';

export const normalizeDough = (dough) => ({
    ...dough,
    value: doughSizes[dough.id]
});

export const normalizeIngredient = (ingredient) => ({
    ...ingredient,
    value: ingredients[ingredient.id]
});

export const normalizeSauce = (sauce) => ({
    ...sauce,
    value: sauces[sauce.id]
});

export const normalizeSize = (size) => ({
    ...size,
    value: sizes[size.id]
});

export const getImage = (image) => {
    // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
    return new URL(`../../assets/img/${image}`, import.meta.url).href
}
