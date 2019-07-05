module.exports = {
    set: function(value) {
        document.getElementById('FanSpeedProgress').value = value;
        document.getElementById('FanSpeedInput').value = value;
    },
    update: function( value ) {
        this.set(value);

    }
}