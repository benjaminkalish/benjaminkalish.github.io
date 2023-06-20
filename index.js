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
    $('#manicule').remove();
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
    'Hi.',
    'My name is Ben Kalish.',
    'I like to code. // a lot',
    'Click above to see some of my projects...',
    'how to reach me...',
    'and some info about myself.',
    'Or, you could download my resume.',
    'Thank you for visiting.'
];

let textIndex = 0;
let charIndex = 0;

ctx.font = `${1.5 * canvas.width / maxStringLength(text)}px 'Courier New', Courier, monospace`;
ctx.fillStyle = 'white';

let writing = true;
(async function () {
    while (writing) {
        // if (textIndex < text.length) {
        if (text[textIndex].length > charIndex) {
            if (textIndex >= 3 && textIndex <= 6) {
                $(`header > button:nth-of-type(${textIndex - 2}), header > a button:nth-of-type(${7 - textIndex})`)
                    .addClass('hover');
                $(`header span:nth-of-type(${textIndex - 2})`).text('\u261D');
            }
            ctx.fillText(`${text[textIndex].slice(0, charIndex + 1)}\u25AE`, 10, canvas.height / 4);
            charIndex++;
            await pause(100);
            if (charIndex !== text[textIndex].length) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        else {
            charIndex = 0;
            await pause(2000);

            if (textIndex >= 3 && textIndex <= 6) {
                $(`header > button:nth-of-type(${textIndex - 2}), header > a button:nth-of-type(${7 - textIndex})`)
                    .removeClass('hover');
                $(`header span:nth-of-type(${textIndex - 2})`).text('');
            }
            textIndex++;
            // if (textIndex !== text.length) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // }
        }
        // }
        /* else {
            textIndex = 0;
        } */
        if (textIndex === text.length) {
            textIndex = 0;
        }
    }
})();

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