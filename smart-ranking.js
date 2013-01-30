(function() {
    
    /*
        var ratings = [
            { votes: [3,2,1], id:'Batman' },
            { votes: [1,2,3,4,5], id:'Robin' }
        ];
    */

    var Ranking = (function() {
        
        var _getStats = function(ratings){
            
            var sumTotalVotes = 0;
            var numTotalVotes = 0;

            var numRatings = ratings.length;
            
            var scores = {};
            
            for(var i=0;i<numRatings;i++) {
                
                var review = ratings[i];
                var votes = review.votes;
                var numVotes = votes.length;
                var sumVotes = 0;

                for(var j=0;j<numVotes;j++) {
                    sumVotes+=votes[j];
                }
                
                sumTotalVotes+=sumVotes;
                numTotalVotes+=numVotes;
                
                scores[review.id] = {
                    _id: review.id,
                    _sumVotes: sumVotes,
                    _numVotes: numVotes,
                    _avgRating: (sumVotes/numVotes)
                }
                
            }
            
            scores._avgRatings = sumTotalVotes/numTotalVotes;
            scores._avgVotes = numTotalVotes/numRatings;
            
            return scores;
            
        }
        
        // based on this article:
        // http://blog.linkibol.com/2010/05/07/how-to-build-a-popularity-algorithm-you-can-be-proud-of/
        var bayesian = function(ratings){
            
            var scores = _getStats(ratings);
            for(var id in scores) {
                // br = ( (avg_num_votes * avg_rating) + (this_num_votes * this_rating) ) / (avg_num_votes + this_num_votes)
                scores[id].score = ( (scores._avgVotes * scores._avgRatings) + (scores[id]._numVotes * scores[id]._avgRating) ) / (scores._avgVotes + scores[id]._numVotes);
            }

            return scores;

        }
        
        // based on this article:
        // http://leedumond.com/blog/the-wisdom-of-crowds-implementing-a-smart-ranking-algorithm
        var amazon = function(ratings, min){
            
            if(!min) min = 3;
            
            var scores = _getStats(ratings);
            for(var id in scores) {
                /*
                (W) = (v ÷ (v+m)) × R + (m ÷ (v+m)) × C
                where:
                R = review average for the beer
                v = number of reviews for the beer
                m = minimum reviews required to be listed (currently 10)
                C = the mean across the list (currently 2.5)
                */
                var v = scores[id]._numVotes;
                var R = scores[id]._avgRating;
                var m = min;
                var C = scores._avgRatings;
                scores[id].score = (v / (v+m)) * R + (m / (v+m)) * C;
            }
            
            return scores;

        }
        
        return {
            bayesian: bayesian,
            amazon: amazon
        };
        
    })();
    
    module.exports = Ranking;
    
})();
