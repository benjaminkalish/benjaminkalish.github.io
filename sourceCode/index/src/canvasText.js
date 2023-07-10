import $ from 'jquery';

const canvas = $('canvas')[0];
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

const text = [
    'Hi.',
    'My name is Ben Kalish.',
    'I like to code. // a lot',
    'Click above to see some of my projects...',
    'how to reach me...',
    'and some info about myself.',
    'Or, you could download my resume.',
    'Thank you for visiting.'
];

let x = 10;
ctx.font = `${1.5 * canvas.width / maxStringLength(text)}px 'Courier New', Courier, monospace`;

let textIndex = 0;
let charIndex = 0;
const buttonPointStart = 3;
const buttonPointEnd = 6;
ctx.fillStyle = 'white';



let typing = true;

export async function type() {
    while (typing) {
        if (text[textIndex].length > charIndex) {
            if (textIndex >= buttonPointStart && textIndex <= buttonPointEnd) {
                $(`header > button:nth-of-type(${textIndex - 2}), header > a button:nth-of-type(${7 - textIndex})`)
                    .addClass('hover');
                $(`header span:nth-of-type(${textIndex - 2})`).text('\u261D');
            }

            ctx.fillText(`${text[textIndex].slice(0, charIndex + 1)}\u25AE`, x, canvas.height / 4);
            charIndex++;
            await pause(Math.floor(Math.random() * 50) + 71);

            if (textIndex === 2 && charIndex === 16) {
                await pause(1000);
            }
            if (charIndex !== text[textIndex].length) {
                clearCanvas();
            }

        }
        else {
            charIndex = 0;
            await pause(2000);

            if (textIndex >= buttonPointStart && textIndex <= buttonPointEnd) {
                $(`header > button:nth-of-type(${textIndex - 2}), header > a button:nth-of-type(${7 - textIndex})`)
                    .removeClass('hover');
                $(`header span:nth-of-type(${textIndex - 2})`).text('');
            }
            textIndex++;
            clearCanvas();
        }

        if (textIndex === text.length) {
            textIndex = 0;
        }
    }
}

function pause(interval) {
    return new Promise(resolve => setTimeout(resolve, interval));
}

function maxStringLength(strArr) {
    let maxLength = 0;
    for (const str of strArr) {
        if (str.length > maxLength) {
            maxLength = str.length;
        }
    }
    return maxLength;
}

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function stopTyping() {
    typing = false;
    clearCanvas();
}