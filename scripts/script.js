//https://plnkr.co/edit/uatHxrMwe78zTNkMJAtI?p=preview

var _counterLengthInSeconds = 3;
var audioHit;
var audioCountdown;
var audioWin;
var freezeTimer = true;
var timer = 0;
var items = ["item5", "item4", "item3", "item2", "item1"];

var selected = null,
    x_pos = 0, y_pos = 0,
    x_elem = 0, y_elem = 0;

function _drag_init(elem) {
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

function _destroy() {
    selected = null;
}

var initElement = function(id) {
    document.getElementById(id).onmousedown = function () {
        _drag_init(this);
        return false;
    };
};

function playHit() {
    audioHit.play();
}

function playCountdown() {
    audioCountdown.play();
}

function playWin() {
    audioWin.play();
}

function removeItem() {
    var item = items.pop();
    var obj = document.getElementById(item);
    obj.style.visibility = "hidden";
    if (items.length == 0) {
        playWin();
        stopTimer();
    }
}

function resetActor(itemId) {
    debugger;
    var style = $( "#actorPicker option:selected" ).text();
    var item = document.getElementById(itemId);
    item.style.visibility = "visible";
    item.className = '';
    item.className = style;
}

function resetActors() {
    resetActor('item1');
    resetActor('item2');
    resetActor('item3');
    resetActor('item4');
    resetActor('item5');
}

window.onload = function() {
    hideResults();
    document.getElementById('actorPicker').onchange=function(){
        resetActors();
    };
    audioHit = document.createElement('audio');
    audioHit.setAttribute('src', 'audio/hit.mp3');
    audioCountdown = document.createElement('audio');
    audioCountdown.setAttribute('src', 'audio/countdown.mp3');
    audioWin = document.createElement('audio');
    audioWin.setAttribute('src', 'audio/win.mp3');

    initElement('timer');
    initElement('legend');
    initElement('item1');
    initElement('item2');
    initElement('item3');
    initElement('item4');
    initElement('item5');

    document.onmousemove = _move_elem;
    document.onmouseup = _destroy;

    setInterval(function(){
        if (freezeTimer) return;
        var d = new Date();
        var currentTime = d.getTime();
        var clock = document.getElementById("clock");
        var value = (Number(currentTime) - Number(timer)) / 1000;
        var result = value.toFixed(1);
        clock.innerHTML = result;

    }, 10);
};

function restartGame() {
    hideResults();
    restartTimer();
    playCountdown();
    items = ["item5", "item4", "item3", "item2", "item1"];
    resetActors();
    setTimeout(function(){
        startTimer();
    }, 1000*_counterLengthInSeconds);
}

function startTimer() {
    hideResults();
    freezeTimer = false;
    var d = new Date();
    timer = d.getTime();
    document.getElementById("clock").innerHTML = "0.0";
    document.getElementById("clock").style.visibility = "visible";
}
function stopTimer() {
    freezeTimer = true;
    showResults();
}

function timerIsRunning() {
    return !freezeTimer;
}

function restartTimer() {
    debugger;
    freezeTimer = true;
    document.getElementById("clock").innerHTML = "0.0";
}

function showResults() {
    document.getElementById("clockBig").innerHTML = document.getElementById("clock").innerHTML;
    document.getElementById("clock").style.visibility = "hidden";
    document.getElementById("clockBig").style.visibility = "visible";
}

function hideResults() {
    document.getElementById("clock").style.visibility = "visible";
    document.getElementById("clockBig").style.visibility = "hidden";
}

$(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        removeItem();
        playHit();
    }
    if(e.which == 13) {
        if (timerIsRunning())
            stopTimer();
        else
            restartGame();
    }
});

