'use strict';

module.exports = function(app, db) {
    var search = require(process.cwd() + '/app/common/search.js');
    var Recents = require(process.cwd() + '/app/controllers/recents.js')
    var recents = new Recents(db);
    
    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });
        
    app.route('/api/search/*')
        .get(function(req, res) {
            search(req, res, recents);
        });
        
    app.route('/api/recent')
        .get(recents.getRecents);
}