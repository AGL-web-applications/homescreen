/*
 * Copyright 2019 Igalia, S.L.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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