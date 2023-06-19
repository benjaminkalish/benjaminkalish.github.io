/* global $ */
'use strict';

const projectsButton = $('header > button:nth-child(1)');
const contactButton = $('header > button:nth-child(2)');
const aboutButton = $('header > button:nth-child(3)');
const projects = $('body > div:nth-of-type(1)');
const contact = $('body > div:nth-of-type(2)');
const about = $('body > div:nth-of-type(3)');

projectsButton.click(() => headerClick(projects));
contactButton.click(() => headerClick(contact));
aboutButton.click(() => headerClick(about));

const copied = $('li span');

$('#copy').click(() => {
    navigator.clipboard.writeText('benjamin.kalish@gmail.com');
    copied.show();
});

async function headerClick(element) {
    await slidUp(projects);
    await slidUp(contact);
    await slidUp(about);
    copied.hide();
    writing = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    element.slideDown();
}

function slidUp($element) {
    return new Promise(resolve => {
        $element.slideUp({
            complete: resolve
        });
    });
}

const canvas = $('canvas')[0];
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
const text = [
    'My name is Ben Kalish.',
    'I like to code.',
    'Click above to see some of my projects...',
    'how to reach me...',
    'and some info about myself.',
    'Or, you could download my resume.',
    'Thank you for visiting.'
];

let textIndex = 0;
let charIndex = 0;
/* let x = 0;
let y = canvas.height / 2;
*/


ctx.font = `${1.5 * canvas.width / maxStringLength(text)}px 'Courier New', Courier, monospace`;
ctx.fillStyle = 'white';


// const interval = setInterval(() => {
/*  if(text.length > index){
     ctx.fillText(text.slice(0, index + 1), 10, canvas.height / 2);
     index++;
 }
 else{
     clearInterval(interval);
 } */
// let bool = true;
let char = '\u25AE';
/*  const foo = setInterval(()=>{
    if(bool){
        char = '\u25AE';
    }
    else{
        char = '';
    }
    bool = !bool;
 }, 30); */

let writing = true;
(async function () {
    while (writing) {
        if (textIndex < text.length) {
            if (text[textIndex].length > charIndex) {
                /* if (bool) {
                    char = '\u25AE';
                }
                else {
                    char = '';
                }
                if (charIndex % 3) {
                    bool = !bool;
                } */
                ctx.fillText(`${text[textIndex].slice(0, charIndex + 1)}${char}`, 10, canvas.height / 3);
                charIndex++;

                await pause(125);
                if (charIndex !== text[textIndex].length) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

            }
            else {
                textIndex++;
                charIndex = 0;
                await pause(2000);
                if (textIndex !== text.length) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        }
        else {
            writing = false;
            // clearInterval(foo);
        }
    }
})();

// }, 500);

/* let blink = true;
const cursor = setInterval(() => {
        if(blink){
        ctx.fillRect(x, y, canvas.width / text.length, 1.5 * canvas.width / text.length);
        
        }
        else{
            ctx.clearRect(x, y, canvas.width / text.length + 1, 1.5 * canvas.width / text.length + 1);
        }
        blink = !blink;
}, 500);
 */

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