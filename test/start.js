import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import chacarters from "./characters.js";
import contentItem from "./getContentItem.js";
import screen from "./screen.js";
import strings from "./strings.js"
import characters from './characters.js';
import search from "./search.js";

export default function() {
    characters();
    contentItem();
	screen();
    strings();
    search();
};
