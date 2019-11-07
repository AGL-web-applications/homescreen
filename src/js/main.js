import { init as init_apps } from './apps';
import { init as init_weather } from './weather';
import { init as init_network } from './network';
import { init as init_time } from './time';

export function init() {
    init_apps();
    init_weather();
    init_network();
    init_time();
}