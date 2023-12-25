import { Component, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartsComponent } from '../charts/charts.component';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';
import { DeleteComponentComponent } from '../delete-component/delete-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allUsers: any
  driverApprove: any
  public addUserForm!: FormGroup;
  userId: any
  @ViewChild('chartsComponent', { static: true }) chartsComponent!: ChartsComponent;
  @ViewChild('userDetailComponent', { static: true }) userDetailComponent!: UserDetailModalComponent;
  @ViewChild('deleteComponent', { static: true }) deleteComponent!: DeleteComponentComponent;

  constructor(private homeService: HomeService, private ngbService: NgbModal,public router: Router
  ) { }



  ngOnInit() {
    console.log("init");
    this.getUsers()


  }
  openUserDetail(id: any = null) {


    this.userDetailComponent.show(id)
    // this.ngbService.open(content, { centered: true ,size:"xl"});




  }
  onSort(name: any) {

  }
  getUsers() {

    console.log("getUdss");
    this.homeService.getUsers().subscribe({
      next: (data: any) => {


        this.allUsers = data.user_list

      }, error: (error) => {
        console.log(error);
      }
    })
  }
  onSearch(val: any) {

  }




  openCharts(user_id: any) {
    this.chartsComponent.show(user_id)
  }
  openConfirm(){
    this.deleteComponent.show()
  }
  checkDelete(event:Boolean){
    if(event){
      this.deleteUser()
    }else{
      this.userId = null
    }
    console.log(event);

  }
  deleteUser(){
      this.homeService.deleteUser(this.userId).subscribe({
        next:(data:any)=>{
    console.log(data);
    this.getUsers()
        },error:(error)=>{
          console.log(error);
        }
      })
  }

}
