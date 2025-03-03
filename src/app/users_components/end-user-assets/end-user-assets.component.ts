import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';

import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AdmAssetsService } from '../../../services/adminServices/adm-assets.service';
import { AuthGoogleService } from '../../../services/auth-google.service';
@Component({
  selector: 'app-end-user-assets',
  standalone: false,
  templateUrl: './end-user-assets.component.html',
  styleUrl: './end-user-assets.component.scss'
})
export class EndUserAssetsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ModalTitle: string | undefined;
  ActivateAddEditAssetsComp: boolean = false;
  events: any;

  displayedColumns: string[] = [
    'CollCode',
    'Name',
    'Desc1',
    'AnDate',
    'MrNum',
    'PropNo',
    'Qty',
    'UM',
    'UCost',
    'TCost',
    'UserName',
    'Email',
    'CurrentUser',
    'EqStatus',
    'Options'
  ];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private service: AdmAssetsService,
    private toastr: ToastrService,
    private authGoogleService: AuthGoogleService
  ) {}


  ngOnInit(): void {
    this.refreshAssetsList();
  }

  ngAfterViewInit(): void {
    // Apply paginator and sort to dataSource once the view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  addClick(): void {
    this.events = {
      Id: 0,
      CollCode: '',
      Name: '',
      Desc1: '',
      AnDate: '',
      MrNum: '',
      PropNo: '',
      Qty: '',
      UM: '',
      UCost: '',
      TCost: '',
      UserName: '',
      Email:'',
      CurrentUser:'',
      EqStatus:''
    };
    this.ModalTitle = 'Add Assets';
    this.ActivateAddEditAssetsComp = true;
  }

  editClick(item: any): void {
    console.log(item);
    this.events = item;
    this.ModalTitle = 'Edit Assets';
    this.ActivateAddEditAssetsComp = true;
    console.log(item);
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure you want to delete this repository?')) {
      this.service.deleteAssets(item.Id).subscribe(() => {
        this.toastr.error('Deleted Successfully', 'Deleted');
        this.refreshAssetsList();
      });
    }
  }

  closeClick(): void {
    this.ActivateAddEditAssetsComp = false;
    this.refreshAssetsList();
  }


  refreshAssetsList(): void {
    const userEmail = localStorage.getItem('userEmail'); // ✅ Get email from localStorage
  
    if (!userEmail) {
      console.error('❌ No email found in localStorage.');
      return;
    }
  
    this.authGoogleService.getUserAssets(userEmail).subscribe({
      next: (data) => {
        this.dataSource.data = data.sort((a, b) => b.Id - a.Id); // Sort descending by ID
  
        // Ensure paginator and sort are updated after data is assigned to dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('❌ Error fetching assets:', err);
      }
    });
  }
  
  exportToExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Assets');

    // Define Header Row
    const header = [
      'CollCode',
      'Name',
      'Description',
      'Annual Date',
      'Mr Number',
      'Property Number',
      'Quantity',
      'Unit Measure',
      'Unit COst',
      'Total Cost',
      'Username',
      'Email',
      'Current USer',
      'Status'
    ];

    // Add Header with Styling
    const headerRow = worksheet.addRow(header);

    if (headerRow && typeof headerRow.eachCell === 'function') {
      headerRow.eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF00FF00' }, // Green background
        };
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFFFF' }, // White font
        };
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle',
          wrapText: true,
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };

        // Initialize column width based on header length
        worksheet.getColumn(colNumber).width = header[colNumber - 1].length + 5;
      });
    }

    // Add Data Rows
    this.dataSource.data.forEach((item) => {
      const row = worksheet.addRow([
        item.CollCode,
        item.Name,
        item.Des1,
        item.AnDate,
        item.MrNum,
        item.PropNo,
        item.Qty,
        item.UM,
        item.UCost,
        item.TCost,
        item.UserName,
        item.Email,
        item.CurrentUser,
        item.EqStatus
      ]);

      row.eachCell((cell, colNumber) => {
        cell.alignment = { vertical: 'middle', wrapText: true };

        // Adjust column width if data is longer than header
        const currentWidth = worksheet.getColumn(colNumber).width || 10;
        const newWidth = Math.max(
          currentWidth,
          (cell.value?.toString().length || 0) + 5
        );
        worksheet.getColumn(colNumber).width = newWidth;
      });
    });

    // Export to Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'Event_List.xlsx');
    });
  }
  exportToPDF(): void {
    const doc = new jsPDF();

    // Add logos
    const leftLogo = 'assets/img/UPM_LOGO.png'; // Replace with actual path
    const rightLogo = 'assets/img/ITO.png'; // Replace with actual path

    const imgWidth = 30;
    const imgHeight = 30;

    doc.addImage(leftLogo, 'PNG', 10, 10, imgWidth, imgHeight);
    doc.addImage(rightLogo, 'PNG', 170, 10, imgWidth, imgHeight);

    // Add Title
    doc.setFontSize(16);
    const lineHeight = 1.5 * doc.getFontSize(); // Adjust line height based on font size

    doc.text(
      ['Assets List Report - 2025', 'Inventory Ticketing System'],
      105,
      25,
      {
        align: 'center',
        lineHeightFactor: 1.5, // This applies 1.5 line spacing
      }
    );
    // doc.text('Event List Report - 2025', 105, 25, { align: 'center' });
    // doc.text('Gender and Development Office', 105, 35, { align: 'center' }); // 10 units below the first line

    // Prepare table data
    const headers = [
      [
        'CollCode',
        'Name',
        'Description',
        'Annual Date',
        'Mr Number',
        'Property Number',
        'Quantity',
        'Unit Measure',
        'Unit COst',
        'Total Cost',
        'Username',
        'Email',
        'Current USer',
        'Status'
      ],
    ];
    const data = this.dataSource.data.map((item) => [
      item.CollCode,
      item.Name,
      item.Desc1,
      item.AnDate,
      item.MrNum,
      item.PropNo,
      item.Qty,
      item.UM,
      item.UCost,
      item.TCost,
      item.UserName,
      item.Email,
      item.CurrentUser,
      item.EqStatus

      // item.UploadedFile || '',
    ]);

    // Add table
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 50,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [220, 53, 69],
        textColor: 255,
        halign: 'center',
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Save PDF
    doc.save('Event_List_Report.pdf');
  }

  
}
