var left = 22;
var right = 22;

var lowTemperature = 15;
var hiTemperature = 30;
var temperatures = [];

var isScrolling;
var elementHeight;

function createTemperatureElement() {
    var element = document.createElement('div');
    element.classList = ['temperature'];
    element.style.height = elementHeight+'px';
    element.style.lineHeight = elementHeight+'px';
    return element;
}

function update(node, index) {
    node.scrollTop = index*elementHeight;

    for( var i=0; i<node.children.length; i++) {
        node.children[i].setAttribute('enabled',false);
    }
    node.children[index].setAttribute('enabled', true);
}

module.exports = {
    left: function(node) {
        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            var index = Math.round(node.scrollTop/elementHeight);
            left = temperatures[index];
            update(node, index);
            console.log('LEFT', left);
        }, 100);
    },
    right: function(node) {
        clearTimeout(isScrolling);

        isScrolling = setTimeout(function(){
            var index = Math.round(node.scrollTop/elementHeight);
            right = temperatures[index];
            update(node, index);
            console.log('RIGHT', right);
        }, 100);
    },
    init: function() {
        var leftTemperature = document.getElementById('lefttemperature');
        var rightTemperature = document.getElementById('righttemperature');
        elementHeight = leftTemperature.offsetHeight/2;

        for( var i=lowTemperature; i<=hiTemperature; i++) {
            var element = createTemperatureElement();
            if( i === lowTemperature) {
                element.innerHTML = 'LO';
            } else if( i === hiTemperature ) {
                element.innerHTML = 'HI';
            } else {
                element.innerHTML = i+'º';
            }
            leftTemperature.appendChild(element);
            rightTemperature.appendChild(element.cloneNode(true));
            temperatures[temperatures.length] = i;
        }
        leftTemperature.appendChild(createTemperatureElement());
        rightTemperature.appendChild(createTemperatureElement());

        update(leftTemperature, temperatures.indexOf(left));
        update(rightTemperature, temperatures.indexOf(right));
    }
}