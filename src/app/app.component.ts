import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'form-app';
  selectedFile;

  userDataForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    paymentImage: new FormControl(null),
  });

  async onSubmit() {
    const formData = new FormData();
    formData.append('name', this.userDataForm.value.name);
    formData.append('email', this.userDataForm.value.email);
    formData.append('paymentImage', this.selectedFile);
    console.log('Form data:', formData.get('paymentImage'));

    const response = await axios.post(
      'https://form-app-server-uh4d.onrender.com/api/submit',
      formData
    );
    console.log(response);
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.userDataForm.get('paymentImage').setValue(this.selectedFile);
  }
}
