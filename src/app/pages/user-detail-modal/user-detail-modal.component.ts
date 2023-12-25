import { Component, Output, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrl: './user-detail-modal.component.css'
})
export class UserDetailModalComponent {
  @ViewChild('content', { static: true })  content!: NgTemplateOutlet;
 @Output() UserHandler: EventEmitter<any> = new EventEmitter<any>();


  addUserForm: any
  charts:any = []
  userId:any



  constructor(private homeService:HomeService,    private ngbService: NgbModal){}

  show(id:any){
    this.createUserFormGroup() 
    this.ngbService.open(this.content, { centered: true ,size:"xl"});
    if(id){

      this.getUserdetail(id)
    }
    this.userId = id
  }


  createUserFormGroup() {
    this.addUserForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      token: new FormControl(null, [Validators.required]),
      database: new FormControl(null, [Validators.required]),
      database_string: new FormControl(null, [Validators.required]),
      collection: new FormControl(null, [Validators.required]),
      
    });
  }

  addRow(){
    this.charts.push({name:"",active:true,query:[]})
  }
  updateUser(model:any= null){



      
      for (const index in this.charts) {
        this.charts[index].name = ( document.getElementById(`chart_name${index}`)as HTMLInputElement).value
        this.charts[index].type = ( document.getElementById(`chart_type${index}`)as HTMLInputElement).value
        this.charts[index].query = ( document.getElementById(`chart_query${index}`)as HTMLInputElement).value
        this.charts[index].query = JSON.parse( this.charts[index].query)
      }
      console.log(this.charts);
      
      let data = {...this.addUserForm.value,charts:[...this.charts]}
      // let data = {}
      
      this.homeService.updateUser(this.userId,data).subscribe({
        next:(data:any)=>{
          console.log(data);
          this.UserHandler.emit();
          console.log('vvaa');

          model.dismiss('Cross click')
        },error:(error)=>{
          console.log(error);
        }
      })
      
    
  }

  getUserdetail(id:any){
    this.homeService.getUserDetail(id).subscribe({
      next:(data:any)=>{
        let user_detail = data.user_detail


        for (const index in user_detail.charts) {

          user_detail.charts[index].query = (user_detail.charts[index].query).map((stage:any) => JSON.stringify(stage, null, 2))
          user_detail.charts[index].query =  "[" + user_detail.charts[index].query +"]"          
        }
        this.userId = user_detail._id
        this.addUserForm.patchValue({
          name:user_detail.name,
          email:user_detail.email,
          token:user_detail.token,
          database:user_detail.database,
          database_string:user_detail.database_string,
          collection:user_detail.collection,
        })
        this.charts = user_detail.charts
        // this.charts[0].query = user_detail.charts[0].query.map((stage:any) => JSON.stringify(stage, null, 2))
        
   

      },error:(error)=>{
        console.log(error);
      }
    })
  }

  tokenGenerator() {

    console.log('call');
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 32; i++){

      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(token);
    (document.getElementById('token')as HTMLInputElement).value = token

};



removeChart(index:any,model:any){


  this.charts.splice(index, 1)
  this.updateUser(model)


}
}
