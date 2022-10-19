export function randomInt(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
} 

export function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}