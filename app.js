// we declare a new global variable containing an array that represents the ballons map
// you have to add more colors into the ballonsMap array
let ballonsMap = ['green'];
const maxBalloons = 20;
let activeBalloons = maxBalloons;

// poping a balloon is basically turning his color to null (no color)
const popBalloon = (event,position) => {
    // set the color to null on the balloon position
    activeBalloons--;
    ballonsMap[position] = null;
    event.target.classList.remove('active');
    event.target.classList.add('popped');
    render();
}

const render = () => {
    
    // convert ballons map of colors into real html balloons
    const ballons = ballonsMap.map((color, position) => {
        return (ballonsMap[position]==null) ? null:`<div class="balloon active"></div>`; // <--- render each balloon
    });

    document.querySelector("#balloon-count").innerHTML = ballons.filter(b => b !== null).length; // <-- render the balloon count into the DOM

    if (activeBalloons == maxBalloons) { // First call to render.
        document.querySelector("#balloon-map").innerHTML = ballons.join(''); // <-- render the balloons into the DOM
    }
    if(activeBalloons == 0) window.location.reload(); // <--- reload website when no more balloons are left
}

// this makes the "render" function trigger when the website starts existing
window.onload = function() {

    let colors = ['green','red','blue','orange','yellow','purple','brown'];
    for (let i=1; i<maxBalloons; i++){
        let n = Math.floor(Math.random()*colors.length);
        ballonsMap.push(colors[n]);
    }
    render();
    let elem = document.querySelector("#balloon-map");
    for (let i=0; i<maxBalloons; i++){
        elem.childNodes[i].style.backgroundColor = ballonsMap[i];
        elem.childNodes[i].addEventListener('click',(event) => popBalloon(event,i));
    }
}
