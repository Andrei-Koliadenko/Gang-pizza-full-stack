export default function getRandomNumber(min: number, maxi: number): number {
    const max = maxi + 1;
    return Math.round(Math.random() * (max - min) + min);
}