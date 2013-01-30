# NodeJS library for smart ranking

# Instalation

```
npm install smart-ranking
```

## How to use it

```js
var Ranking = require('smart-ranking');

var ratings = [
    { votes: [3,2,1], id:'Item 1' },
    { votes: [1,2,3,4,5], id:'Item 2' }
];

var bayesianScore = Ranking.bayesian(ratings);
var amazonScore = Ranking.amazon(ratings);
```

## Output example

```js
	amazonScore = {
		"Item 1":{"_id":"Item 1","_sumVotes":6,"_numVotes":3,"_avgRating":2,"score":2.3125},
		"Item 2":{"_id":"Item 2","_sumVotes":15,"_numVotes":5,"_avgRating":3,"score":2.859375},
		"_avgRatings":2.625,"_avgVotes":4
	}
```
