export function log(text: string, color: string = 'black')
{
    console.log(`%c ${text}`, `color: ${color}`);
}