import { Component } from '@angular/core';
  import Medicine from 'lib/entities/medicine';
  import { buffer } from 'rxjs';
  import * as XLSX from 'xlsx';

  @Component({
    selector: 'medicine-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
  })
  export class UploadComponent {
    medicines: Medicine[] = [];

    ngOnInit(): void {
      this.loadExcel();
    }

    loadExcel(): void {
      const filePath = "assets/MEDICAMENTOS_VETERINARIA.xlsx";

      fetch(filePath)
        .then(res => res.arrayBuffer())
        .then(buffer => {
          const data = new Uint8Array(buffer)
          const workbook = XLSX.read(data, {type: 'array'});
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);


          this.medicines = jsonData.map((row: any, index) => ({
            id: index + 1,
            name: row['NOMBRE'],
            buy_price: Number(String(row['PRECIO COMPRA'])),
            sell_price: Number(String(row['PRECIO VENTA'])),
            stock: Number(row['UNIDADES DISPONIBLES']),
            sold: Number(row['UNIDADES VENDIDAS'])

          }));
        })
        .catch(error => {
          console.error('Archivo error', error);
        });

    }

  }
