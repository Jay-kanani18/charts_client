import { NgTemplateOutlet } from '@angular/common';
import { Component, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrl: './delete-component.component.css'
})
export class DeleteComponentComponent {
  @Output() DeleteHandler: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @ViewChild('content', { static: true })
  content!: NgTemplateOutlet;




  constructor(  private ngbService: NgbModal){}



  show(){
    this.ngbService.open(this.content, { centered: true ,size:"md",keyboard:false});

  }

  onCancel(){
    this.DeleteHandler.emit(false)
    
  }
  onDelete(){
    this.DeleteHandler.emit(true)

  }
}
