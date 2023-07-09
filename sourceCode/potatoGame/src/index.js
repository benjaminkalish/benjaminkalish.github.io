import $ from "jquery";
import './css/index.css';
import setup from "./setup";

const soundIcon = await setup();

let removed = [];
let parts = document.querySelectorAll('.draggable');

$('main')[0].style.gridTemplate = `6px 5em 10px / 80px 30px ${$('body').width() - 220}px 30px 80px`;
$('#start').show();

function restore() {
    if (localStorage.parts) {
        const oldParts = JSON.parse(localStorage.parts);
        for (let i = 0; i < parts.length; i++) {
            const { top, left, position } = oldParts[i];
            if (top && left && position) {
                $(parts[i]).css({
                    left: left,
                    top: top,
                    position: position
                })
                    .show()
                    .removeClass('unused');
            }
        }
    }
}

$('#start').click(
    function () {
        this.remove();
        $('#buttons').show();
        $('#mute').css('display', 'flex');
        $('#muppet').prop('volume', 0.3)[0].play();
        restore();
    }
);

$('#mute').click(mute);

let audibles = $('#muppet, #drop, #buzzer, #goodbye'),
    soundOn = audibles.prop('muted'),
    soundImg = $('#mute img');

function mute() {
    soundOn = !audibles.prop('muted');
    audibles.prop('muted', soundOn);
    soundImg.attr('src', soundOn ? soundIcon.unmute : soundIcon.mute);
}

let open;
$('#parts').click(() => {
    if (open) {
        $('#selectors').animate({
            marginLeft: ['-=750px', 'swing']
        });
        open = !open;
        $('.unused').hide();
    }
    else {
        $('#selectors').animate({
            marginLeft: ['+=750px', 'swing']
        });
        open = !open;
    }
});

function playIt(htmlAudio) {
    return new Promise(function (resolve, reject) {
        htmlAudio.onended = resolve;
        htmlAudio.onerror = reject;
        htmlAudio.play();
    });
}

let music = $('#muppet');

$('#reset').click(async () => {
    localStorage.parts = '';
    parts.forEach(part => {
        $(part).css({
            left: '',
            top: '',
            position: 'static'
        });
    });
    $('main').append(removed);
    $('.draggable').hide().addClass('unused');
    music.prop('muted', true);
    await playIt($('#buzzer')[0]);
    music.prop('muted', soundOn);
});

$('#selectors button:first-child').click(() => { $('.unused').hide(); $('.hats').show(); });
$('#selectors button:nth-child(2)').click(() => { $('.unused').hide(); $('.glasses').show(); });
$('#selectors button:nth-child(3)').click(() => { $('.unused').hide(); $('.eyes').show(); });
$('#selectors button:nth-child(4)').click(() => { $('.unused').hide(); $('.noses').show(); });
$('#selectors button:nth-child(5)').click(() => { $('.unused').hide(); $('.mouths').show(); });
$('#selectors button:nth-child(6)').click(() => { $('.unused').hide(); $('.arms').show(); });
$('#selectors button:nth-child(7)').click(() => { $('.unused').hide(); $('.shoes').show(); });

let dragging = false;
let offset;
let trash = $('#trash');

$(document).on('mousedown', '.draggable', e => {
    e.preventDefault();

    offset = { y: e.offsetY, x: e.offsetX, };

    dragging = $(e.target)
        .removeClass('unused')
        .css('position', 'absolute');

    dragging.css({
        top: e.pageY - offset.y,
        left: e.pageX - offset.x
    });
}).mousemove(e => {
    if (dragging) {
        dragging.css({
            top: e.pageY - offset.y,
            left: e.pageX - offset.x
        });
    }
}).mouseup(() => {
    if (dragging) {
        dragging[0].used = true;

        if (dragging.position().left + dragging.width() > trash.position().left &&
            dragging.position().top + dragging.height() > trash.position().top) {
            removed.push(dragging);
            dragging.css({ top: '', left: '' }).remove();
            $('#goodbye').prop('volume', 0.4)[0].play();
        }
        else {
            $('#drop').prop('volume', 1)[0].play();
        }

        dragging = false;

        let jsArr = [];
        parts.forEach(part => {
            jsArr.push({
                top: part.style.top,
                left: part.style.left,
                position: part.style.position,
            });
        });
        localStorage.parts = JSON.stringify(jsArr);
    }
});