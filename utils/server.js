function getArrayOfVotes(voteList){
  let votedArr = [];
  voteList.map(el=>{el.checked && votedArr.push(el.name)});
  return votedArr;
}
module.exports.getArrayOfVotes = getArrayOfVotes;


function getVoteListFromArray(voteArr){
  return require('../data/characters.json').characters.map(el => { if( voteArr.includes(el.name) ) el.checked = true; return el });
}
module.exports.getVoteListFromArray = getVoteListFromArray;
