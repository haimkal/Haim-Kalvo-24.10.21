import { atom, selector } from 'recoil'


export const appState = atom({
    key: 'appState',
    default: {
        input: '',
        weather: {},
        dailyWeather: [],
        cityName: '',
        country: ''
    }
})

export const inputSelector = selector({
    key: 'inputSelector',
    get: ({ get }) => {
        const myState = get(appState)
        console.log(myState);
        return myState.input
    },
    set: ({ set }, newValue) => {
        set(appState, newValue)

    }
});
export const weatherSelector = selector({
    key: 'weatherSelector',
    get: ({ get }) => {
        const myState = get(appState)
        return myState.weather
    }
});
export const dailyWeatherSelector = selector({
    key: 'dailyWeatherSelector',
    get: ({ get }) => {
        const myState = get(appState)
        return myState.dailyWeatherSelector
    }
});
export const cityNameSelector = selector({
    key: 'cityNameSelector',
    get: ({ get }) => {
        const myState = get(appState)
        return myState.cityNameSelector
    }
});
export const countrySelector = selector({
    key: 'countrySelector',
    get: ({ get }) => {
        const myState = get(appState)
        return myState.countrySelector
    }
});