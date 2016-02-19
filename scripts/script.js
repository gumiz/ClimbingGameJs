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

function removeItem() {
    var item = items.pop();
    var obj = document.getElementById(item);
    obj.style.visibility = "hidden";
    if (items.length == 0)
        stopTimer();
}

function setItemVisible(itemId) {
    document.getElementById(itemId).style.visibility = "visible";
}

window.onload = function() {

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
        debugger;
        var value = (Number(currentTime) - Number(timer)) / 1000;
        var result = value.toFixed(1);
        clock.innerHTML = result;

    }, 10);
};

function restartGame() {
    items = ["item5", "item4", "item3", "item2", "item1"];
    setItemVisible('item1');
    setItemVisible('item2');
    setItemVisible('item3');
    setItemVisible('item4');
    setItemVisible('item5');
    startTimer();
}

function startTimer() {
    freezeTimer = false;
    var d = new Date();
    timer = d.getTime();
    document.getElementById("clock").innerHtml = "0.0";
    document.getElementById("clock").style.visibility = "visible";
}
function stopTimer() {
    freezeTimer = true;
}
function restartTimer() {
    document.getElementById("clock").innerHtml = "0.0";
}

$(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        removeItem();
    }
    if(e.which == 13) {
        restartGame();
    }
});

