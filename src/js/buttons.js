var buttons = {
    ac: false,
    auto: false,
    circulation: false,
    down: false,
    up: false,
    right: false,
    rear: false,
    front: false
};

function update(node, value) {
    node.setAttribute('value', value);
}

module.exports = {
    toggle: function(node) {
        var key = node.getAttribute('key');
        buttons[key] = !buttons[key];
        update(node, buttons[key]);
    }
}