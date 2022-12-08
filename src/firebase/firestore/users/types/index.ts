export interface SimpleUser {
  id: string;
  contacts: Array<SimpleUser["id"]> | [];
  name: string;
  phoneNumber: string;
}
