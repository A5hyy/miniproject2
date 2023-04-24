export class UserDTO {
  userID:any;
  userName:any;
  firstName:any;
  lastName:any;
  email:any;
  dateOfBirthStr:any;
  status:any;
  userType:any;

  constructor(userDTO?) {
    userDTO = userDTO || {};

    this.userID = userDTO.userID || '';
    this.userName = userDTO.userName || '';
    this.firstName = userDTO.firstName || '';
    this.lastName = userDTO.lastName || '';
    this.email = userDTO.email || '';
    this.dateOfBirthStr = userDTO.dateOfBirthStr || '';
    this.status = userDTO.status || 'ACT';
    this.userType = userDTO.userType || 'ADMIN';
  }
}
