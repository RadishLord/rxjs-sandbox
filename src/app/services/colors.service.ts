export const colors: string[] = ['blue', 'green', 'orange', 'purple', 'pink', 'brown', 'gold'];
export function getColor (i: number): string {
    while(i >= colors.length){
        i -= colors.length;
    }
    return colors[i];
}
