'use strict';

module.exports = function(db) {
    
    var querries = db.collection('querries');
    
    this.newRecent = function(query) {
        querries.count(function(err, n) {
            if (err) {
                throw err;
            }
            
            if (n > 9) {
                querries.findOneAndReplace(
                    {},
                    { 'query': query, 'date': new Date() },
                    { sort: { 'date': 1} }
                );
            } else {
                querries.insert({ 'query': query, 'date': new Date() });
            }
        });
    }
    
    this.getRecents = function(req, res) {
        querries
            .find({}, { '_id': false })
            .sort({ 'date': 1 })
            .toArray(function(err, data){
                if(err) {
                    throw err;
                }
                res.send(data);
            });
    }
}