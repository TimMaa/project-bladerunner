import { Injectable } from '@angular/core';

@Injectable()
export class UserManagementService {

  user = {
    name: '',
    type: 0,
  };

  constructor() { }

}
