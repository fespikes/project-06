import { getAttrsForDirectiveMatching } from "@angular/compiler/src/render3/view/util";

export const clearOutlet = function(outletName, router) {
  router.navigate([{outlets: { [outletName]: null}}]);
}
/* 
export const session = (function() {
  const store = window.sessionStorage;
  const keys = {
    'currentUserName': 'federation.currUser.name',
    'currentUserIsAdmin': 'federation.currUser.role.IsAdmin',
    'currentUserIsTenant': 'federation.currUser.role.IsTenant'
  };
  return {
    get: store.getItem,
    set: store.setItem,
    setUserName: argu => store.setItem(keys.currentUserName, argu),
    getUserName: () => store.getItem(keys.currentUserName),
    setUserIsAdmin: argu => store.setItem(keys.currentUserIsAdmin, argu),
    getUserIsAdmin: () => store.getItem(keys.currentUserIsAdmin),
  }
})(); */

export const ObjectToArray = (obj, type?) => {
  const result = [];
  Object.keys(obj).forEach(item => result.push(type ==='value'? obj[item]: item));
  return result;
}

export class Session {
  store: any;
  keys = {
    'currentUserName': 'federation.currUser.name',
    'currentUserIsAdmin': 'federation.currUser.role.IsAdmin',
    'currentUserIsTenant': 'federation.currUser.role.IsTenant',
    'currentUserTenantName': 'federation.currUser.tennat.name'
  };
  set userName(name) {
    this.store.setItem(this.keys.currentUserName, name) }
  get userName() {
    return this.store.getItem(this.keys.currentUserName) }

  set isAdmin(argu) {
    this.store.setItem(this.keys.currentUserIsAdmin, argu) }
  get isAdmin() {
    return this.store.getItem(this.keys.currentUserIsAdmin) }
  
  set isTenant(argu) {
    this.store.setItem(this.keys.currentUserIsTenant, argu) }
  get isTenant() {
    return this.store.getItem(this.keys.currentUserIsTenant) }
  set tenant(tenant) {
    this.store.setItem(this.keys.currentUserTenantName, tenant);
  }
  get tenant() {
    return this.store.getItem(this.keys.currentUserTenantName);
  }

  constructor() { this.store = window.sessionStorage }
}

export const session = new Session();

export const getAttrsFromObj = function(obj) {
  const attrs = [];
  Object.keys(obj).forEach(item => {
    attrs.push({
      key: item,
      value: obj[item]
    })
  });
  return attrs;
}
