import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ParrotService} from '../../services/parrot.service';
import {ToastrService} from 'ngx-toastr';
import {Parrot} from '../../interfaces/parrot';

@Component({
  selector: 'app-register-parrot',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-parrot.component.html',
  styleUrl: './register-parrot.component.css'
})
export class RegisterParrotComponent {
  formParrotRegister = new FormGroup({
    scientificName: new FormControl('', [Validators.required]),
    colloquialName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    lifeExpectancyInYears: new FormControl('', [Validators.required, Validators.min(1)]),
    photoLink: new FormControl('', [Validators.required])
  });

  constructor(
    private _parrotService: ParrotService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  registerParrot() {
    // Create the new parrot object
    const formValue = this.formParrotRegister.value;
    const newParrot: Parrot = {
      scientificName: formValue.scientificName!,
      colloquialName: formValue.colloquialName!,
      description: formValue.description!,
      lifeExpectancyInYears: Number(formValue.lifeExpectancyInYears), // Convert to number
      photoLink: formValue.photoLink!
    };

    // Call the service to register the parrot
    this._parrotService.addNewParrot(newParrot).subscribe({
      next: () => {
        this.toastr.success('Parrot registered successfully!');
        this.router.navigate(['/parrots']);
      },
      error: (error) => {
        this.toastr.error('Error registering parrot: ' + error.error.message);
      }
    });
  }

  get scientificName() {
    return this.formParrotRegister.get('scientificName');
  }

  get colloquialName() {
    return this.formParrotRegister.get('colloquialName');
  }

  get description() {
    return this.formParrotRegister.get('description');
  }

  get lifeExpectancyInYears() {
    return this.formParrotRegister.get('lifeExpectancyInYears');
  }

  get photoLink() {
    return this.formParrotRegister.get('photoLink');
  }

}
