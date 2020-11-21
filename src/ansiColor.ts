
function parseHexColor(input: string): number[]|null {
    // color is in hex format, like 002200 or 3344ff
    const m = input.match(/^([0-9a-f]{6})$/i);
    if (m) {
        return [
            parseInt(m[1].substr(0,2),16),
            parseInt(m[1].substr(2,2),16),
            parseInt(m[1].substr(4,2),16)
        ];
    } else {
        return null;
    }
}


const esc = '\u001b'

const ansiColor = {
    startColor(hexColor: string) {
        const color = parseHexColor(hexColor)
        if (!color) return '';

        const brightness = color.reduce((a, b) => a + b) / 3;
        let foreground;
        if (brightness > 190) {
            // black
            foreground = `${esc}[38;2;0;0;0m`
        } else {
            // white
            foreground = `${esc}[38;2;255;255;255m`
        }
        const background = `${esc}[48;2;${color[0]};${color[1]};${color[2]}m`
        return background + foreground;
    },
    endColor() {
        return `${esc}[0m`
    }
}

export default ansiColor;
