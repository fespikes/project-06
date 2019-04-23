
// show "用户管理"
export const adminRoles = [
  'ROLE_FED_ADMIN',
  'ROLE_FED_VIEWER',
  'ROLE_FED_USER_ADMIN',
  'ROLE_FED_USER_VIEWER'
];

// ObjectToArray(tenantTypes, true);

export const tenantTypes = {
  guardian: 'GUARDIAN',
  cas: 'CAS'
}
export const tenantActionTypes = {
  edit: 'edit',
  create: 'create',
  remove: 'remove'
}
export const tenantPrivacyTypes = {
  public: 'PUBLIC',
  private: 'PRIVATE'
}

export const oAuthPrivacyTypes = {
  public: 'PUBLIC',
  confidential: 'CONFIDENTIAL'
}

export const timeOptions = {
  // minute: 'mi',
  hour: 'h',
  // day: 'd',
  // month: 'mo',
  // year: 'y'
}
