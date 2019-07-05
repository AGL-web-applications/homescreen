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

module.exports = {
    update: function() {
        for( var button in buttons ) {
            document.getElementById(button+'button').setAttribute('value', buttons[button]);
        }
    },
    ac: function() {
        buttons.ac = !buttons.ac;
        this.update();
    },
    auto: function() {
        buttons.auto = !buttons.auto;
        this.update();
    },
    circulation: function() {
        buttons.circulation = !buttons.circulation;
        this.update();
    },
    down: function() {
        buttons.down = !buttons.down;
        this.update();
    },
    up: function() {
        buttons.up = !buttons.up;
        this.update();
    },
    right: function() {
        buttons.right = !buttons.right;
        this.update();
    },
    rear: function() {
        buttons.rear = !buttons.rear;
        this.update();
    },
    front: function() {
        buttons.front = !buttons.front;
        this.update();
    }
}