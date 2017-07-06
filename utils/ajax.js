export function hitApi(method){
  return fetch('//localhost:5000/api/vote?access_token='+this.state.token, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: this.state.logged.name,
      id: this.state.logged.id,
      votes: this.state.list
    })
  })
}

export function getUserVotes(id){
  return fetch('//localhost:5000/api/votes/'+id+'?access_token='+this.state.token)
}
