import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
// Version: 1.2
// Creator: WebInspector
export let options = {
  vus:2,
  duration: '10s'
}; 
export default function() {
let query = `
query LocalizedStringsQuery($input: LocalizedStringsInput) {
  localizedStrings(input: $input) {
    totalItems
    pageIndex
    items {
      key
      language
      value
      createdAt
      updatedAt
    }
  }
}`;

let headers = {
  'Content-Type': 'application/json',
  'app-type': 'LATAM'
};
let variables = {
  "input": {
    "language": "spa",
    "count": 100
  }
};
let res = http.post('https://prod-dkids-otto-api.discoverykidsplus.com/api/client/gql', JSON.stringify({ query: query, variables:variables}), { headers: headers },);

sleep(1)
    check(res,{
        'Status 200': (r) => r.status === 200,
        'Spanish is displayed': (r) => r.body.includes("spa")
     });
}

export function handleSummary(data) {
	console.log('Preparing the end-of-test summary...');
	return {
	  "Reports/StringsOtto.html": htmlReport(data),
	  stdout: textSummary(data, { indent: " ", enableColors: true }),
	};
  }
