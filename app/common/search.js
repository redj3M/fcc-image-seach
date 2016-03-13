'use strict';

module.exports = function(req, res, recents) {
    var request = require('request');
    
    
    if (req.params['0'] === '') {
        return 'please use a search query';
    }
    
    recents.newRecent(req.params['0']);
    
    var offset = req.query['offset'];
    if (!offset) {
        offset = 10;
    }
    
    var reqUrl = 'https://www.googleapis.com/customsearch/v1?q=' + req.params['0'] + '&num=' + offset + '&' + process.env.API_PARAM;
    
    request(reqUrl, function(err, response, body) {
        if (err) {
            throw err;
        }
        var results = JSON.parse(body).items.map(function(val) {
            return {
                'page-url': val.link,
                'image-url': val.pagemap.cse_image[0].src,
                'title': val.title
            }
        });
        res.send(results);
    });
}