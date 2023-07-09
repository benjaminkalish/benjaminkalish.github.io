import $ from "jquery";

export default async function setup() {

    function importAll(r) {
        let media = {};
        r.keys().map((item) => { media[item.replace('./', '')] = r(item); });
        return media;
    }

    const media = importAll(require.context('./media', false));

    $('body').html(`<audio id="muppet" loop src=${media['30 - Mah Na Mah Na.mp3']}></audio>
    <audio id="drop" src=${media['drop.wav']}></audio>
    <audio id="buzzer" src=${media['buzzer.mp3']}></audio>
    <audio id="goodbye" src=${media['goodbye.mp3']}></audio>
    <main>
        <div id="buttons">
            <button id="parts">Parts</button>
            <button id="reset">Reset</button>
        </div>
        <div id="selectors">
            <button>Hats</button>
            <button>Glasses</button>
            <button>Eyes</button>
            <button>Noses</button>
            <button>Mouths</button>
            <button>Arms</button>
            <button>Shoes</button>
        </div>
        <button id="mute">
            <img src=${media['sound-off-icon-40963.jpg']} alt="">
        </button>
        <img id="potato" src="${media['potato.png']}" alt="" draggable="false">
        <img id="start" src=${media['start-png-44881.png']} alt="" draggable="false">
        <img id="blHat" class="draggable hats unused" src=${media['blue-hat.png']} alt="">
        <img id="boHat" class="draggable hats unused" src=${media['bowler-hat.png']} alt="">
        <img id="glados" class="draggable eyes unused" src=${media['glados.png']} alt="">
        <img id="glasses" class="draggable glasses unused" src=${media['glasses.png']} alt="">
        <img id="googly" class="draggable eyes unused" src=${media['googly.png']} alt="">
        <img id="mouth" class="draggable mouths unused" src=${media['mouth.png']} alt="">
        <img id="muscleL" class="draggable arms unused" src=${media['muscle-arm-l.png']} alt="">
        <img id="muscleR" class="draggable arms unused" src=${media['muscleR.png']} alt="">
        <img id="mustache" class="draggable noses unused" src=${media['mustache.png']} alt="">
        <img id="mustacheGlasses" class="draggable noses glasses unused" src=${media['mustacheGlasses.png']} alt="">
        <img id="nose" class="draggable noses unused" src=${media['nose.png']} alt="">
        <img id="partyHat" class="draggable hats unused" src=${media['party-hat.png']} alt="">
        <img id="redEyes" class="draggable eyes unused" src=${media['red-eyes.png']} alt="">
        <img id="shark" class="draggable mouths unused" src=${media['shark-mouth.png']} alt="">
        <img id="shoes" class="draggable shoes unused" src=${media['shoes.png']} alt="">
        <img id="sunglasses" class="draggable glasses unused" src=${media['sunglasses.png']} alt="">
        <img id="surprised" class="draggable eyes unused" src=${media['surprised.png']} alt="">
        <img id="terminator" class="draggable arms unused" src=${media['terminator.png']} alt="">
        <img id="tentacle" class="draggable arms unused" src=${media['tentacle.png']} alt="">
        <img id="trash" src=${media['trash.png']} alt="" draggable="false">
    </main>`);

    return { mute: media['sound-off-icon-40963.jpg'], unmute: media['unmute.png'] };
}