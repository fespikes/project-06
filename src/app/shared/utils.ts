import { getAttrsForDirectiveMatching } from "@angular/compiler/src/render3/view/util";
import { Pagination } from 'tdc-ui';
import { environment } from '../../environments/environment';

export const clearOutlet = function(outletName, router) {
  router.navigate([{outlets: { [outletName]: null}}]);
}
export const isProduction = environment.production;
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

export const ObjectToArray = (obj, type?, arr?) => {
  const result = [];
  Object.keys(obj).forEach(
    item => result.push(
      arr ? {'key': item, 'value': obj[item]} :
        type ? obj[item]:
          item
    )
  );
  return result;
}

export class Session {
  store: any;
  keys: any = {
    'currentUserName': 'federation.currUser.name',
    'currentUserIsAdmin': 'federation.currUser.role.IsAdmin',
    'currentUserIsTenant': 'federation.currUser.role.IsTenant',
    'currentUserTenantName': 'federation.currUser.tennat.name',
    'current': 'federation.currUser.'
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

  set [name](argu) {
    this.store.setItem(this.keys['current'] + name, JSON.stringify(argu))
  }
  
  get [name]() {
    const parse = JSON.parse;
    return parse(this.store.getItem(this.keys['current'] + name));
  }

  constructor() { this.store = window.sessionStorage }
}

export const session: any = new Session();

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

export const getUnitAndMax = function(u) {
  let unit, max;  // TODO: make use the max is the case
  switch (u) {
    case 'mi':
      unit = 60;
      max = 24 * 60 * 60;
      break;
    case 'h':
      unit = 60 * 60;
      max = 60;
      break;
    case 'd':
      unit = 24 * 60 * 60;
      max = 100;
      break;
    case 'mo':
      unit = 30 * 24 * 60 * 60;
      max = 12;
      break;
    case 'y':
      unit = 360 * 24 * 60 * 60;
      max = 10;
      break;
  }
  return {
    unit : unit,
    max: max
  };
}

export class Paging extends Pagination {
  static instance() {
    return new Paging();
  }
  /* set totalPageNumber(ag){ this.itemCount = ag }
  get totalPageNumber() {
    return this.itemCount || Math.floor(this.total%this.pageSize);
  } */

  set pageNumber(ag) { this.page = ag }
  get pageNumber() { return this.page }

  set pageSize(ag) { this.size = ag }
  get pageSize() { return this.size }

  /* set itemCount(ag) { this.total = ag }
  get itemCount() { return this.total } */
  constructor(page?: number, size?: number, total?: number) {
    super(page, size, total);
    // this.totalPageNumber = this.itemCount/this.pageSize;
  }

  afterReturn(pageNumber, pageSize, itemCount) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    // this.itemCount = itemCount;
  }

}