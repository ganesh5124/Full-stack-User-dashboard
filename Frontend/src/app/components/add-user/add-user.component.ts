import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  addUserForm: any = FormGroup;
  updateValue: any = {};
  action:string = 'add' // action is for which operation is performing
  constructor(private fb: FormBuilder, private userServive: UserService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.resetUserForm();
    this.getRouterData();
  }

  resetUserForm() {
    const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    this.addUserForm = this.fb.group({
      id: null,
      firstname: [{ value: null, disabled: false }, [Validators.required]],
      lastname: [{ value: null, disabled: false }],
      email: [{ value: null, disabled: false }, [Validators.required, Validators.pattern(emailRegex)]],
      username: [{ value: null, disabled: false }, [Validators.required]],
      password: [{ value: null, disabled: false }, [Validators.required]],
      gender: [{ value: 1, disabled: false }]
    })
  }

  AddorUpdateUserForm(type: string) {
    const formVal = this.addUserForm.value;
    if (this.addUserForm.valid) {
      console.log("formVal", formVal);
      let payload: any = {
        firstname: formVal.firstname,
        lastname: formVal.lastname,
        email: formVal.email,
        username: formVal.username,
        password: formVal.password,
        gender: formVal.gender,
        isActive: 1
      }
      if (type === 'add') {
        payload['id'] = null
        this.userServive.addUserToList(payload).subscribe((response: any) => {
          console.log(response);
          if (response.status) {
            alert(response.message)
            this.addUserForm.reset()
          }
        })
      }
      if(type === 'update'){
        payload['id'] = formVal.id
        this.userServive.updateUser(payload).subscribe((response: any) => {
          console.log(response);
          if (response.status) {
            alert(response.message)
            this.addUserForm.reset()
          }
        })
      }
    } else {
      console.log(this.addUserForm);
      this.addUserForm.markAllasTouched()
      alert("Please enter valid details")
    }
  }
  getRouterData() {
    console.log(history.state.item);

    this.updateValue = history.state.item;
    this.action = this.updateValue?.action
    this.updateUserList()
  }

  updateUserList() {
    this.addUserForm.patchValue({
      id: this.updateValue?.id,
      firstname: this.updateValue.firstname,
      lastname: this.updateValue.lastname,
      email: this.updateValue.email,
      username: this.updateValue.username,
      password: this.updateValue.username,
      gender: +this.updateValue.gender
    })

  }
}
