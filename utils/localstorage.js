const LS = window.localStorage;

export function storeLocally(item, data){
  let isObjectOrArray = Object.prototype.toString.call(data).match(/(Array|Object)/) !== null;
  this.setState({[item]: data});
  LS.setItem(item, isObjectOrArray ? JSON.stringify(data) : data );
}

export function locallyStored(item){
  return LS.getItem(item) !== null && JSON.parse(LS.getItem(item));
}
