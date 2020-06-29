function updateState(prev, newState) {
  if('function' === typeof(newState)) {
    newState = newState(prev);
  }
  return Object.assign({}, prev, newState);
}

function withState(target) {
  target.prototype.State = function (newState) {
    this.setState(prev => updateState(prev, newState));
  };
}

export { withState, updateState };
