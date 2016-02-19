
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

window.onload = function() {

    initElement('item1');
    initElement('item2');
    initElement('item3');
    initElement('item4');
    initElement('item5');

    document.onmousemove = _move_elem;
    document.onmouseup = _destroy;

};
