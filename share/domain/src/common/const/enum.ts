export enum ProductStatus {
  ACTIVE = 1,
  IN_ACTIVE = 0,
}

export enum RegisterType {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
  NORMAL = 'Normal',
}

export enum RoleType {
  ADMIN = 'ADMIN',
  SHOP = 'SHOP',
  USER = 'USER',
}

export enum Permission {
  ALL = 'ALL',
  CREATE_ANY = 'CREATE_ANY',
  CREATE_OWN = 'CREATE_OWN',
  READ_ANY = 'READ_ANY',
  READ_OWN = 'READ_OWN',
  UPDATE_ANY = 'UPDATE_ANY',
  UPDATE_OWN = 'UPDATE_OWN',
  UPDATE_BY_ATTRIBUTE = 'UPDATE_BY_ATTRIBUTE',
  DELETE_ANY = 'DELETE_ANY',
  DELETE_OWN = 'DELETE_OWN',
}

export enum OrderStatus {
  SUBMITTED = 'SUBMITTED',
  AWAITING_VALIDATION = 'AWAITING_VALIDATION',
  STOCK_CONFIRMED = 'STOCK_CONFIRMED',
  SHIPPED = 'SHIPPED',
  CANCEL = 'CANCEL',
  PAID = 'PAID'
}

export enum ShopStatus {
  ACTIVE = 1,
  BANNED = 2,
  FROZEN = 3,
}

export enum ShopLevel {
  NONE = 'NONE',
  OFFICIAL = 'OFFICIAL'
}