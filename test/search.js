import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// Version: 1.2
// Creator: WebInspector
export let options = {
  vus: 2,
  duration: '10s',
};
export default function () {
  let query = `
query SearchItems($input: ContentItemInput) {
  contentItems(input: $input) {
    totalItems
    pageIndex
    items {
      id
      displayStatus
      path
      __typename
      ... on Episode {
        ...episodeFragment
        __typename
      }
      ... on InteractiveVideo {
        ...interactivevideoFragment
        __typename
      }
      ... on Title {
        ...titleFragment
        __typename
      }
      ... on Game {
        ...gameFragment
        __typename
      }
      ... on Activity {
        ...activityFragment
        __typename
      }
    }
    __typename
  }
  }

fragment imagesFields on Image {
  id
  uri
  class
  __typename
  }

fragment episodeFragment on Episode {
  id
  displayStatus
  title
  episodeNumber
  seasonNumber
  playbackToken
  accessKey
  badges
  duration
  genre
  flexContentId
  rating
  isMovie
  images {
    ...imagesFields
    __typename
  }
  series {
    id
    title
    seasons {
      id
      title
      seasonNumber
      __typename
    }
    __typename
  }
  __typename
  }

fragment interactivevideoFragment on InteractiveVideo {
  id
  title
  description
  version
  badges
  bundles
  subgenres
  images {
    ...imagesFields
    __typename
  }
  series {
    id
    title
    __typename
  }
  __typename
  }

fragment titleFragment on Title {
  id
  title
  subtype
  badges
  duration
  genre
  images {
    ...imagesFields
    __typename
  }
  __typename
  }

fragment gameFragment on Game {
  id
  title
  description
  version
  badges
  bundles
  subgenres
  images {
    ...imagesFields
    __typename
  }
  series {
    id
    title
    __typename
  }
  __typename
  }

fragment activityFragment on Activity {
  id
  title
  description
  version
  badges
  bundles
  images {
    ...imagesFields
    __typename
  }
  series {
    id
    title
    __typename
  }
  __typename
  }`;

  let headers = {
    'Content-Type': 'application/json',
    'app-type': 'LATAM',
  };
  let variables = {
    input: {
      count: 20,
      pageIndex: 0,
      query: 'dolores',
    },
  };
  let res = http.post(
    'https://prod-dkids-otto-api.discoverykidsplus.com/api/client/gql',
    JSON.stringify({ query: query, variables: variables }),
    { headers: headers }
  );

  sleep(1);
  check(res, {
    'Status 200': (r) => r.status === 200,
    'Search Buscando a Dolores is displayed': (r) =>
      r.body.includes('buscando-a-dolores'),
  });
}

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  return {
    'Reports/SearchOtto.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
