
// show "用户管理"
export const adminRoles = [
  'ROLE_FED_ADMIN',
  'ROLE_FED_VIEWER',
  'ROLE_FED_USER_ADMIN',
  'ROLE_FED_USER_VIEWER'
];

export const providerTypes = {
  guardian: 'GUARDIAN',
  // cas: 'CAS' // templetely hide it
}

export const tenantTypes = {
  guardian: 'GUARDIAN',
  cas: 'CAS'
}
export const tenantActionTypes = {
  edit: 'edit',
  create: 'create',
  remove: 'remove'
};
export const tenantGroups = {
  public: 'PUBLIC',
  private: 'PRIVATE'
}
