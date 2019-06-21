/* JS */
import '@iconfu/svg-inject';
import './js/AFB.js';
import { init, launch } from './js/app.js';

/* CSS */
import './styles/app.scss';

window.launch = launch;

document.addEventListener('DOMContentLoaded', init);