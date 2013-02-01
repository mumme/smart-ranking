(function() {

    var Ranking = (function() {
        
        var _getStats = function(ratings, returnArray){
            
            var sumTotalVotes = 0;
            var numTotalVotes = 0;

            var numRatings = ratings.length;
            
            var scores = returnArray ? [] : {};
            
            for(var i=0;i<numRatings;i++) {
                
                var review = ratings[i];
                var votes = review.votes;
                if(votes) {

                    var numVotes = votes.length;
                    var sumVotes = 0;

					var id = review.id ? review.id : review._id.id;

                    for(var j=0;j<numVotes;j++) {
                        sumVotes+=votes[j];
                    }

                    sumTotalVotes+=sumVotes;
                    numTotalVotes+=numVotes;
                    
                    var obj = {
                        id: review._id,
                        sumVotes: sumVotes,
                        numVotes: numVotes,
                        avgRating: (sumVotes/numVotes)
                    }
                    
                    if(returnArray) {
                        scores.push(obj);
                    } else {
                        scores[id] = obj;
                    }
                    
                } else {
                    
                    sumTotalVotes+=review.sumVotes;
                    numTotalVotes+=review.numVotes;
                    
					var id = review.id ? review.id : review._id.id;

                    var obj = {
                        id: id,
                        sumVotes: review.sumVotes,
                        numVotes: review.numVotes,
                        avgRating: (review.sumVotes/review.numVotes)
                    }
                    
                    if(returnArray) {
                        scores.push(obj);
                    } else {
                        scores[obj.id] = obj;
                    }
                    
                }
                
            }
            
            scores.avgRatings = sumTotalVotes/numTotalVotes;
            scores.avgVotes = numTotalVotes/numRatings;
            
            return scores;
            
        }
        
        // based on this article:
        // http://blog.linkibol.com/2010/05/07/how-to-build-a-popularity-algorithm-you-can-be-proud-of/
        var bayesian = function(ratings, returnArray){
	
            var scores = _getStats(ratings, returnArray);
            for(var id in scores) {
                // br = ( (avg_num_votes * avg_rating) + (this_num_votes * this_rating) ) / (avg_num_votes + this_num_votes)
                scores[id].score = ( (scores.avgVotes * scores.avgRatings) + (scores[id].numVotes * scores[id].avgRating) ) / (scores.avgVotes + scores[id].numVotes);
            }

            return scores;

        }
        
        // based on this article:
        // http://leedumond.com/blog/the-wisdom-of-crowds-implementing-a-smart-ranking-algorithm
        var imdb = function(ratings, returnArray, min){

            if(!min) min = 3;
            
            var scores = _getStats(ratings, returnArray);
            for(var id in scores) {
                /*
                (W) = (v ÷ (v+m)) × R + (m ÷ (v+m)) × C
                where:
                R = review average for the beer
                v = number of reviews for the beer
                m = minimum reviews required to be listed (currently 10)
                C = the mean across the list (currently 2.5)
                */
                var v = scores[id].numVotes;
                var R = scores[id].avgRating;
                var m = min;
                var C = scores.avgRatings;
                scores[id].score = (v / (v+m)) * R + (m / (v+m)) * C;
            }
            
            return scores;

        }
        
        return {
            bayesian: bayesian,
            imdb: imdb
        };
        
    })();
    
    module.exports = Ranking;
    
})();
