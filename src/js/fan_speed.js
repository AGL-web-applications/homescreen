var value = 0;

function update(node, value) {
    node.value = value;
    node.parentNode.getElementsByTagName('progress')[0].value = value;
}

module.exports = {
    set: function(node) {
        value = node.value;
        update(node, value);
    }
}