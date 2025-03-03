import { Component, Input, OnInit } from '@angular/core';
import { AdmAssetsService } from '../../../../services/adminServices/adm-assets.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-assets',
  standalone: false,
  templateUrl: './add-edit-assets.component.html',
  styleUrl: './add-edit-assets.component.scss'
})
export class AddEditAssetsComponent implements OnInit {
  //Equip. Type Selection
  equipmentTypes = ['Desktop','All in One Desktop','Laptop', 'Printer', 'Server'];
  StatusTypes = ['Working','Need Service','For Waste']
  constructor(
    
    private service: AdmAssetsService,
    private toastr: ToastrService // private toast: NgToastService
  ) {}
  @Input() events: any;
  Id: string | undefined;
  CollCode: string | undefined;
  Name: string | undefined;
  Desc1: string | undefined;
  Andate: string | undefined;
  MrNum: string | undefined;
  PropNo: string | undefined;
  Qty:string| undefined;
  UM:string|undefined;
  UCost: string | undefined;
  TCost: string | undefined;
  UserName: string | undefined;
  Email: string | undefined;
  CurrentUser: string | undefined;
  EqStatus: string | undefined;
  AssetssList : any = [];
  ngOnInit(): void {
    this.loadEventsList();
 
  }

  loadEventsList() {
    this.service.getAssets().subscribe((data: any) => {
      this.AssetssList = data;
      this.Id = this.events.Id;
      this.CollCode = this.events.CollCode;
      this.Name = this.events.Name;
      this.Desc1 = this.events.Desc1;
      this.Andate = this.events.AnDate;
      this.MrNum = this.events.MrNum;
      this.PropNo = this.events.PropNo;
      this.Qty = this.events.Qty;
      this.UM =this.events.UM;
      this.UCost =this.events.UCost;
      this.TCost =this.events.TCost;
      this.UserName =this.events.UserName;
      this.Email =this.events.Email;
      this.CurrentUser =this.events.CurrentUser;
      this.EqStatus =this.events.EqStatus;
      

   
    });
  }

  addEvents() {
    var val = {
      Id: this.Id,
      CollCode: this.CollCode,
      Name: this.Name,
      Desc1: this.Desc1,
      Andate: this.Andate, 
      MrNum: this.MrNum, 
      PropNo: this.PropNo, 
      Qty: this.Qty, 
      UM: this.UM, 
      UCost: this.UCost,
      TCost:this.TCost,
      UserName:this.UserName,
      Email: this.Email,
      CurrentUser: this.CurrentUser,
      EqStatus: this.EqStatus

    };
  
    this.service.addAssets(val).subscribe(() => {
      this.toastr.success('Added Successfully', 'Added');
    });
  }
  
  updateEvents() {
    var val = {
      Id: this.Id,
      CollCode: this.CollCode,
      Name: this.Name,
      Desc1: this.Desc1,
      Andate: this.Andate, 
      MrNum: this.MrNum, 
      PropNo: this.PropNo, 
      Qty: this.Qty, 
      UM: this.UM,
      UCost: this.UCost,
      TCost:this.TCost,
      UserName:this.UserName,
      Email: this.Email,
      CurrentUser: this.CurrentUser,
      EqStatus: this.EqStatus
    };
  
    this.service.updateAssets(val).subscribe(() => {
      this.toastr.warning('Updated Successfully', 'Updated');
    });
  }
  

  // uploadFile(event: any) {
  //   const file = event.target.files[0];
  //   if (!file) return; // Add this check
  
  //   const formData: FormData = new FormData();
  //   formData.append('uploadedFile', file, file.name);
  
  //   this.service.uploadFile(formData).subscribe((data: any) => {
  //     this.UploadedFile = data.toString();
  //     this.PhotoFilePath = this.service.PhotoUrl + this.UploadedFile;
  //   });
  // }
  
}
