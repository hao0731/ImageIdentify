import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message:String = 'empty';
  uploadForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = fb.group({
      'file': [null, [Validators.required]]
    });
  }
  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
        this.uploadForm.patchValue({
          file: <File>event.target.files[0]
       });
    }
  }

  submitForm(value: any) {
    const data = new FormData();
    data.append('file', value['file'], value['file']['name']);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.post('/api/images/identify', data, {observe: 'response', headers: headers}).subscribe(res => {
      this.message = res['body']['data'];
    },(err:HttpErrorResponse) => {
      this.message = err['error']['message'];
    });
  }
}
