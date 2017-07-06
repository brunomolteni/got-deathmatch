const Datastore = require('nedb');
const db = new Datastore({ filename: 'database.db', autoload: true });
const {getArrayOfVotes, getVoteListFromArray} = require('./utils/server');

module.exports = (app, passport) => {
  app.get('/api/votes/:id',
    passport.authenticate('facebook-token'),
    function (req, res) {

      console.log('Fetching votes for userid ',req.params.id);

      db.findOne({ _id: req.params.id }, function (err, doc) {
        !!err && console.log('error getting votes:',err);
        console.log('Got the Votes!',doc);
        res.json(getVoteListFromArray(doc.voted));
      });
    }
  );
  app.post('/api/vote',
    passport.authenticate('facebook-token'),
    function (req, res) {
      let error = false;
      console.log('Saving new vote');

      let doc = {
        _id: req.body.id,
        name: req.body.name,
        voted: getArrayOfVotes(req.body.votes)
      };

      db.insert(doc,(err,insertedDoc)=>{
        console.log('inserted:',insertedDoc);
        if(!!err){
          console.log('error inserting:',err);
          if(err.errorType === 'uniqueViolated'){
            res.sendStatus(409);
            error = true;
          }else res.sendStatus(req.user? 200 : 401);
        }
      });
    }
  );

  app.put('/api/vote',
    passport.authenticate('facebook-token'),
    function (req, res) {

      console.log('Changing a vote');

      let doc = {
        _id: req.body.id,
        name: req.body.name,
        voted: getArrayOfVotes(req.body.votes)
      };

      db.update({_id: req.body.id},doc,{upsert: true},(err,insertedDoc)=>{
        !!err && console.log('error updating:',err);
        console.log('Updated:',insertedDoc);
        res.sendStatus(req.user? 200 : 401);
      });


    }
  );
}
