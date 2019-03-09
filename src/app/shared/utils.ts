
export const clearOutlet = function(outletName, router) {
  router.navigate([{outlets: { [outletName]: null}}]);
}

export const session = (function() {
  const store = window.sessionStorage;
  const keys = {
    'currentUserName': 'federation.currUser.name',
    'currentUserIsAdmin': 'federation.currUser.role.IsAdmin'
  };
  return {
    get: store.getItem,
    set: store.setItem,
    setUserName: argu => store.setItem(keys.currentUserName, argu),
    getUserName: () => store.getItem(keys.currentUserName),
    setUserIsAdmin: argu => store.setItem(keys.currentUserIsAdmin, argu),
    getUserIsAdmin: () => store.getItem(keys.currentUserIsAdmin),
  }
})();

export const ObjectToArray = (obj, type?) => {
  const result = [];
  Object.keys(obj).forEach(item => result.push(type ==='value'? obj[item]: item));
  return result;
}
