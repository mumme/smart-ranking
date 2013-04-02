# NodeJS library for smart ranking

# Installation

```
npm install smart-ranking
```

## Usage

```js
var ratings = [
    { votes: [3,2,1], id:'Batman' },
    { votes: [1,2,3,4,5], id:'Robin' }
];

var Ranking = require('smart-ranking');

var bayesianScore = Ranking.bayesian(ratings);
var imdbScore = Ranking.imdb(ratings);
```

### Input

Three different inputs are accepted:

```js
// Input 1: raw votes
var ratings = [
    { votes: [3,2,1], 	  id:'Batman' },
    { votes: [1,2,3,4,5], id:'Robin'  }
];
```

```js
// Input 2: vote sum & total (with id object)
var ratings = [
	{ sumVotes: 10, numVotes:3, _id:{ id:'Batman' } },
	{ sumVotes: 10, numVotes:3, _id:{ id:'Robin'  } }
];
```

```js
// Input 3: vote sum & total (with id string)
var ratings = [
	{ sumVotes: 10, numVotes:3, id:'Batman' },
	{ sumVotes: 10, numVotes:3, id:'Robin'  }
];
```

## Output

Two different outputs are available:

```js
	// Output 1: returns an object
	var imdbScore = Ranking.imdb(ratings);
	imdbScore = {
		"Item 1":{"id":"Item 1","sumVotes":6,"numVotes":3,"avgRating":2,"score":2.3125},
		"Item 2":{"id":"Item 2","sumVotes":15,"numVotes":5,"avgRating":3,"score":2.859375},
		"avgRatings":2.625,
		"avgVotes":4
	}
```

```js
	// Output 2: returns an array
	var imdbScore = Ranking.imdb(ratings, true);
	imdbScore = [
		{"id":"Item 1","sumVotes":6,"numVotes":3,"avgRating":2,"score":2.3125},
		{"id":"Item 2","sumVotes":15,"numVotes":5,"avgRating":3,"score":2.859375}
	]
```


## API


### `Ranking.imdb(ratings, returnArray, min);`

Parameters:
* `ratings (Array)`
	* `Array` with data 
	** See [Input](#input) (above)
* `returnArray (boolean)`
	* If `true`,  the method returns an `Array`
	* If `false`, the method returns an `object`
	** See [Output](#output) (above)
* `min (integer)`
	* Number of reviews required to be listed


### `Ranking.bayesian(ratings, returnArray);`

Parameters:
* `ratings (Array)`
	* `Array` with data 
	* See [Input](#input) (above)
* `returnArray (boolean)`
	* If `true`,  the method returns an `Array`
	* If `false`, the method returns an `object`
	** See [Output](#output) (above)

