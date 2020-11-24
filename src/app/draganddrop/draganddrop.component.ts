import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrls: ['./draganddrop.component.css']
})
export class DraganddropComponent implements OnInit {
@ViewChild('closebtn',{static: false}) closeBtn:ElementRef
  myList:any;
  listForm: FormGroup;
  arrayList: FormArray;
  newTaskName:any;
  array=[]
  lisNames=[]


  connectedTo = [];
  constructor(private fb:FormBuilder,private service:ServiceService) { 
    this.listForm = this.fb.group({
      listName:['',Validators.required],
      arrayList:this.fb.array([])
    })

    this.getData()
  }

  ngOnInit() {
  }


  addList(){
    console.log(this.listForm.value);
    let obj=this.listForm.value
    this.service.addListdata(obj).subscribe(res=>{
      console.log(res);
      this.clearform()
      this.closeBtn.nativeElement.click();
      this.getData()
    })
  }

  createItem() {
    return this.fb.group({
      name: [''],
    })
  }

  addItem() {
    this.arrayList = this.listForm.get('arrayList') as FormArray;
    this.arrayList.push(this.createItem());
  }

  addtask(index:any,id:number){
    console.log(index);
    this.array=this.myList[index].arrayList
    let obj={
      id:this.array.length+1,
      name:this.newTaskName
    }
    let res=this.array.find(a=>a.name==obj.name)
    if(res){
      alert('this task is already added')
    }else{
      this.array.push(obj)
      this.service.addnewtask(id,this.array).subscribe(res=>{
        console.log(res);
        this.getData()
        this.newTaskName=''
      })
    }
    
  }

  clearform() {
    this.listForm.reset()
    let array = <FormArray>this.listForm.get('arrayList')
    while (array.length) {
      array.removeAt(array.length - 1);
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(this.myList[event.previousIndex]);
      let data=this.myList[event.previousIndex]
      this.service.addnewtask(data.id,data.arrayList).subscribe(res=>{
        this.getData()
      })
      
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
        this.myList.map(a=>{
          this.service.addnewtask(a.id,a.arrayList).subscribe(res=>{
            this.getData()
          })
        })
     
    }
  }


  cleardata(){
    this.newTaskName=''
  }

  getData(){
    this.service.ListData().subscribe(res=>{
      console.log(res);
      this.myList=res
      this.myList.map((a)=>{
        this.connectedTo.push(a.listName)
      })
      console.log(this.connectedTo,"hello");
      
    })
  }

  removeList(id:number){
    let result=confirm("are you sure want to delete this list")
    console.log(result);
    if(result==true){
      this.service.deleteList(id).subscribe(res=>{
        console.log(res);
        this.getData()
      })
    }
   
  }

  deletesingletask(index,iid,lid){
    let res=confirm('are you sure want to delete this card ?')
    if(res==true){
      this.array=this.myList[index].arrayList
      let res=this.array.filter(a=> {
        if(a.id != iid)
        return a
      })
      this.service.addnewtask(lid,res).subscribe(res=>{
        console.log(res);
        this.getData()
      })
    } 
  }
}
