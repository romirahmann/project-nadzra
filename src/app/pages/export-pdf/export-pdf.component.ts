import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss'],
})
export class ExportPDFComponent {
  dataFilterDate: any;
  dataItems: any;
  totalNominal!: any;
  apiUrl!: any;
  filename!: any;
  category_id!: any;
  nama_bulan!: string;
  @ViewChild('templatePDF', { static: false }) templatePDF!: ElementRef;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
      this.dataFilterDate = params;
      this.getDataFilter();
      // this.category_id = parseInt(this.dataFilterDate.category_id);
    });
  }

  generatePDF() {
    const options = {
      margin: 0.5,
      filename: 'reimbursement_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };

    const element = this.templatePDF.nativeElement;

    html2pdf().from(element).set(options).save();
  }

  // GetDataExport
  getDataFilter() {
    console.log(this.dataFilterDate);
    const month = parseInt(this.dataFilterDate?.month);
    const year = parseInt(this.dataFilterDate?.year);
    switch (month) {
      case 1:
        this.nama_bulan = 'Januari';
        break;
      case 2:
        this.nama_bulan = 'Februari';
        break;
      case 3:
        this.nama_bulan = 'Maret';
        break;
      case 4:
        this.nama_bulan = 'April';
        break;
      case 5:
        this.nama_bulan = 'Mei';
        break;
      case 6:
        this.nama_bulan = 'Juni';
        break;
      case 7:
        this.nama_bulan = 'Juli';
        break;
      case 8:
        this.nama_bulan = 'Agustus';
        break;
      case 9:
        this.nama_bulan = 'September';
        break;
      case 10:
        this.nama_bulan = 'Oktober';
        break;
      case 11:
        this.nama_bulan = 'November';
        break;
      case 12:
        this.nama_bulan = 'Desember';
        break;
    }

    console.log(month, year);
    this.apiService.exportFilter(month, year).subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataItems = res.data.data;
        console.log(this.dataItems);
        this.totalNominal = res.data.totalNominal;
        this.apiUrl = environment.apiUrl;
        this.filename = this.dataItems[0].filename;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
