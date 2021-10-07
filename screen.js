import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus:2,
  duration: '10s'
}; 
export default function() {
let query = `
query Screen($id: String!) {
    screen(id: $id) {
      id
      path
      title
      subtype
      seoTitle
      seoPageTitle
      seoDescription
      seoPrimaryKeywords
      seoSecondaryKeywords
      sponsor {
        ...SponsorScreen
        __typename
      }
      images {
        ...Image
        __typename
      }
      components {
        ...Carousel
        ...Opening
        __typename
      }
      __typename
    }
  }
  
  fragment Carousel on Carousel {
    __typename
    id
    header
    contentType
    tiles {
      ...Tile
      __typename
    }
  }
  
  fragment Opening on Opening {
    __typename
    id
    header
    tiles {
      ...Tile
      __typename
    }
  }
  
  fragment Tile on Tile {
    displayImageType
    contentItem {
      ...ContentItem
      ...Title
      ...Episode
      ...Game
      ...Activity
      ...InteractiveVideo
      __typename
    }
    __typename
  }
  
  fragment ContentItem on ContentItem {
    __typename
    id
    path
    title
    displayStatus
  }
  
  fragment Image on Image {
    class
    uri
    __typename
  }
  
  fragment Activity on Activity {
    badges
    sponsor {
      ...SponsorScreen
      __typename
    }
    series {
      id
      title
      __typename
    }
    images {
      ...Image
      __typename
    }
    __typename
  }
  
  fragment Title on Title {
    badges
    subtype
    images {
      ...Image
      __typename
    }
    __typename
  }
  
  fragment Episode on Episode {
    seoTitle
    seoPageTitle
    seoDescription
    seoPrimaryKeywords
    seoSecondaryKeywords
    badges
    episodeNumber
    seasonNumber
    isMovie
    createdAt
    description
    sponsor {
      ...SponsorScreen
      __typename
    }
    episodeSeries: series {
      id
      title
      __typename
    }
    images {
      ...Image
      __typename
    }
    __typename
  }
  
  fragment Game on Game {
    badges
    subgenres
    sponsor {
      ...SponsorScreen
      __typename
    }
    series {
      id
      title
      __typename
    }
    images {
      ...Image
      __typename
    }
    __typename
  }
  
  fragment InteractiveVideo on InteractiveVideo {
    id
    title
    description
    version
    badges
    bundles
    subgenres
    sponsor {
      ...SponsorScreen
      __typename
    }
    images {
      ...Image
      __typename
    }
    series {
      id
      title
      __typename
    }
    __typename
  }
  
  fragment SponsorScreen on Sponsor {
    id
    name
    link
    backgroundColor
    image {
      ...Image
      __typename
    }
    status
    __typename
  }
  
  `;

let headers = {
  'Content-Type': 'application/json',
  'app-type': 'LATAM'
};
let variables = {
 
    "id": "lfl-home-screen"
  
};
let res = http.post('https://prod-dkids-middleware.discoverykidsplus.com/v1/graphql', JSON.stringify({ query: query, variables:variables}), { headers: headers },);

sleep(1)
    check(res,{
        'Status 200': (r) => r.status === 200,
        '¡Gran concurso de baile! is displayed': (r) => r.body.includes("¡Gran concurso de baile!")
     });
}

export function handleSummary(data) {
	console.log('Preparing the end-of-test summary...');
	return {
	  "Reports/ScreenMW.html": htmlReport(data),
	  stdout: textSummary(data, { indent: " ", enableColors: true }),
	};
  }
