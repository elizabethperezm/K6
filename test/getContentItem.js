
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
// Version: 1.2
// Creator: WebInspector

export let options = {
  vus: 10,
  duration: '5s',
};

export default function() {

let query = `
query GetContentItem($id: ID!) {
  contentItem(input: {id: $id}) {
    id
    title
    path
    displayStatus
    description
    logo
    ...LinkPage
    ...EpisodePage
    ...GamePage
    ...ActivityPage
    ...TitlePage
    ...InteractiveVideoPage
    related {
      title
      path
      id
      displayStatus
      ...EpisodePage
      ...GamePage
      ...ActivityPage
      ...TitlePage
      __typename
    }
    __typename
  }
}

fragment ImagePage on Image {
  class
  uri
  __typename
}

fragment SeriePage on Series {
  title
  id
  path
  __typename
}

fragment EpisodePage on Episode {
  seoTitle
  seoPageTitle
  seoDescription
  seoPrimaryKeywords
  seoSecondaryKeywords
  flexContentId
  playbackToken
  accessKey
  badges
  episodeNumber
  seasonNumber
  rating
  isMovie
  createdAt
  images {
    ...ImagePage
    __typename
  }
  sponsor {
    ...Sponsor
    __typename
  }
  episodeSeries: series {
    ...SeriePage
    __typename
  }
  __typename
}

fragment GamePage on Game {
  seoTitle
  seoPageTitle
  seoDescription
  seoPrimaryKeywords
  seoSecondaryKeywords
  bundles
  badges
  subgenres
  series {
    ...SeriePage
    __typename
  }
  images {
    ...ImagePage
    __typename
  }
  sponsor {
    ...Sponsor
    __typename
  }
  __typename
}

fragment InteractiveVideoPage on InteractiveVideo {
  seoTitle
  seoPageTitle
  seoDescription
  seoPrimaryKeywords
  seoSecondaryKeywords
  bundles
  badges
  series {
    ...SeriePage
    __typename
  }
  images {
    ...ImagePage
    __typename
  }
  sponsor {
    ...Sponsor
    __typename
  }
  __typename
}

fragment ActivityPage on Activity {
  seoTitle
  seoPageTitle
  seoDescription
  seoPrimaryKeywords
  seoSecondaryKeywords
  bundles
  series {
    ...SeriePage
    __typename
  }
  images {
    ...ImagePage
    __typename
  }
  sponsor {
    ...Sponsor
    __typename
  }
  __typename
}

fragment TitlePage on Title {
  flexContentId
  playbackToken
  accessKey
  images {
    ...ImagePage
    __typename
  }
  __typename
}

fragment Sponsor on Sponsor {
  id
  name
  link
  backgroundColor
  image {
    ...ImagePage
    __typename
  }
  status
  __typename
}

fragment LinkPage on Link {
  url
  clickDelayDays
  closeDelayDays
  images {
    ...ImagePage
    __typename
  }
  __typename
}

  `;

  let headers = {
	'Content-Type': 'application/json',
	
  };

  let variables = {
	
        "id": "mini-beat-power-rockers/bebes-vaqueros"
      
  };
  
  let res = http.post('https://prod-dkids-otto-api.discoverykidsplus.com/api/client/gql', JSON.stringify({ query: query, variables:variables}), { headers: headers },);
  sleep(1)
	check(res,{
		'Status 200': (r) => r.status === 200,
		'Bebes Vaqueros is displayed': (r) => r.body.includes("Bebés vaqueros")

	
  });

}
export function handleSummary(data) {
	console.log('Preparing the end-of-test summary...');
	return {
	  "Reports/ContentItem.html": htmlReport(data),
	  stdout: textSummary(data, { indent: " ", enableColors: true }),
	};
  }


