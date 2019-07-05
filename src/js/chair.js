var left = 0;
var right = 0;

function update(node, value){
    node.setAttribute('value', value);
}

module.exports = {
    left: function(node) {
        left = (left + 1) % 3;
        update(node, left);
    },
    right: function(node) {
        right = (right + 1) % 3;
        update(node, right);
    },
}