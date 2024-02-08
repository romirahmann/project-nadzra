import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss'],
})
export class ExportPDFComponent implements AfterViewInit {
  dataFilterDate: any;
  dataItems: any;
  totalNominal!: any;
  apiUrl!: any;
  filename!: any;

  @ViewChild('templatePDF', { static: false }) templatePDF!: ElementRef;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.dataFilterDate = params;
      this.getDataFilter();
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
    const month = parseInt(this.dataFilterDate?.month);
    const year = parseInt(this.dataFilterDate?.year);

    this.apiService.exportFilter(month, year).subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataItems = res.data.data;
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
