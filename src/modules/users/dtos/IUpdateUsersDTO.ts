
export default interface IUpdateUserDTO{
  user_id?:string;
  name: string;
  email: string;
  groupsId: string;
  powerUser:boolean;
}
