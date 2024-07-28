import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ FormsModule, PaginationComponent, ViewUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  
})
export class UserComponent implements OnInit{
  rows: any [] =[]
  columns: any [] =[];
  usersList:any [] = [];
  userDetails: any = {}
  viewUserDetails: any;
  userSpinner:boolean = false;
  searchValue:string = ''
  itemsPerPage:number = 5; // Assuming default items per page
  currentPage:number = 1;
  totalItems: number = 0;
  searchTerm: string = '';
  constructor( public userService: UserService, private router: Router){
  }
  ngOnInit(): void {
    console.log("users component");
   this.getAllData(this.currentPage, this.searchTerm);
  }

  // Get List for all the users
  getAllData(page:number, search:string = ''){
    this.userSpinner = true
    this.userService.getAllUsers(page,this.itemsPerPage, search ).subscribe((response:any)=>{
      console.log('.........');
      console.log(response);
      if(response.status){
        this.userSpinner = false
        this.usersList = response.data.users
        this.currentPage = response.data.pagination.page;
      }
    })
  }

  deleteUser(){
      let payload:any = {
        id: this.userDetails.id
      }
      this.userService.deleteUser(payload.id).subscribe((response:any)=>{
        console.log('.........');
        console.log(response);
        if(response.status){
          this.viewUserDetails = response.data[0];
          console.log(this.viewUserDetails);
          
        }
      })
  }

  // Function To Call Search
  getSearchValue(){
      this.getAllData(1, this.searchValue);
  }

  // To update any user
  updateUser(item:any){
    item.action = 'update'
    if(item){
      this.router.navigate(['/dashboard/add-user'], { state: { item: item}})
    }
  }

  // On Page Change to get Page No.
  onPageChange(page: number) {
    console.log(page);
    this.getAllData(page, this.searchValue);
  }

  // To Get All the Pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
