import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import test1 from "./characters.js";
import test2 from "./getContentItem.js";
import test3 from "./screen.js";

export default function() {
    test1();
    test2();
	test3();

};
