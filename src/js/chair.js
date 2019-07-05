var left = 0;
var right = 0;

module.exports = {
    update_left: function() {
        document.getElementById('LeftChair').setAttribute('value', left);
    },
    left: function() {
        left = (left + 1) % 3;
        this.update_left();
    },
    update_right: function() {
        document.getElementById('RightChair').setAttribute('value', right);
    },
    right: function() {
        right = (right + 1) % 3;
        this.update_right();
    },
}