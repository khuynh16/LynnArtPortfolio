import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  formCorrectlySubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.formCorrectlySubmitted = true;

      fetch("https://formsubmit.co/ajax/lynn.clover1206@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: this.contactForm.get('firstName').value + " " + this.contactForm.get('lastName').value,
            email: this.contactForm.get('email').value,
            message: this.contactForm.get('message').value
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
      }
  }
}
