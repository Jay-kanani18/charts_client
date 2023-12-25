import { Component, Input, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartsService } from '../../services/charts.service';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',

})
export class ChartsComponent {

  @Input("user_id")

  title="for whom?"
  is_add=false
  type = 0
  update_id:any= null
  path:any=[]
  items:any=[]
  user_id = null
  modalRef:any
  sidebar = false
  choices = new Array(50)
  catagories:any= []
  subcatagories:any=[]
  charts:any=[]

  @ViewChild('content', { static: true })
  content!: NgTemplateOutlet;

  constructor(  private ngbService: NgbModal,private chartService:ChartsService,private route: ActivatedRoute){
    
        this.route.params.subscribe((params:any) => {
          console.log(params.id); // Access the "id" parameter

        this.user_id =  params.id
        });
      
    
  }

  show(user_id:any,size=null){
    this.user_id = user_id
    this.ngOnDestroy()
  //  this.modalRef= this.ngbService.open(this.content, { centered: true ,size:"md"});
    this.getForWhom(user_id)
  }

  closemodal(){
    
    this.ngbService.dismissAll()
    this.ngOnDestroy()
    
  }

  ngOnInit(){
    this.getForWhom(this.user_id)

  }

  onItem(name:any,id:any){
    console.log(name,id);
    this.update_id = id

    if(this.type==0){
      this.getForwhat(this.update_id)
      this.type=1

      this.title = "for what?"
      this.path.push(name)
      
      
    }else if(this.type==1){
      this.type=2
      this.title = "Charts"

      this.path.push(name)
      this.getCharts(this.update_id)
    }

  }

  onAdd(){

    if(this.type==0){
      
      this.is_add = true
      
      
    }else if(this.type==1){
      this.is_add = true

     
    }

  }
  
  onPart(index:any){

    if(index==0){
      this.title = "for whom?"
      this.items=["Admin","Provider","User","Dispatcher","Corporate","Store"]
      this.path = []
      
      
    }else if(index ==1){
      this.title = "for what?"

      

    }


  }

  addForWhom(){

    let el1 = (document.getElementById('name') as HTMLInputElement).value

    let user_id = this.user_id

    



    this.chartService.add_for_whom({name:el1},user_id).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.getForWhom(this.user_id)

       
      }, error:(error)=>{
        console.log(error);
        ;
      }
    })
  }

  getForWhom(user_id:any){
    this.chartService.get_for_whom(user_id).subscribe({
      next:(data:any)=>{
      this.catagories = data.data
      this.getForwhat(this.catagories[0]._id)
      this.is_add = false


      },error:(error)=>{ 
        console.log(error);
        
      }
    })

  }

  addForwhat(){

    let update_id = this.update_id

    
    
    let el1 = (document.getElementById('name') as HTMLInputElement).value

    this.chartService.add_for_what({name:el1},update_id).subscribe({
      next:(data:any)=>{
        console.log(data);
        console.log(data);
        this.subcatagories = this.getForwhat(this.update_id)  
       
      }, error:(error)=>{
        console.log(error);
        ;
      }
    })
  }


  catagories_name = ''

  getForwhat(id:any){
    console.log(id);
    this.chartService.get_for_what(id).subscribe({
      next:(data:any)=>{
        this.subcatagories = data.data

        console.log(data);

      },error:(error)=>{
        console.log(error);
        
      }
    })
  }

  addItem(){


    if(this.type==0){
      this.addForWhom()
    }else if(this.type==1){
      this.addForwhat()
    }

  }

  getCharts(id:any){

    this.chartService.get_charts(id).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.charts = data.data

      },error:(error)=>{
        console.log(error);
        
      }
    })

    
  }

  addCharts(data:any){
    this.chartService.add_charts(data).subscribe({
      next:(data:any)=>{
        console.log(data);

      },error:(error)=>{
        console.log(error);
        
      }
    })

  }

  ngOnDestroy(){
    this.title="for whom?"
    this.is_add=false
    this.type = 0
    this.update_id= null
    this.path=[]
    this.items=[]
  }
  onTest(){
    console.log(this.modalRef);

  }
  

  change_data(catagories:any){
    this.catagories_name = catagories.name
  }
 

  // Add the following properties and method for the sidebar
  isSidebarOpen = false;

  toggleSidebar(): void {

    console.log('aa');
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onForwhom(id:any){
    this.getForwhat(id)
    this.type=1

    this.title = "for what?"
    this.path.push(name)


  }
  onForwhat(id:any)
{
  this.type=2
  this.title = "Charts"

  this.path.push(name)
  this.getCharts(id)
}
  demo(catagories:any,param:any){
    if(param == catagories.name){
      return [ 'bg-primary', 'text-light' ] 
    }else{
      return []
    }
  }
  // Your existing methods...


}
