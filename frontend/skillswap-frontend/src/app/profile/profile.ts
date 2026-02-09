import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor,ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  user: any = {};
  editForm = new FormGroup({
    bio: new FormControl(''),
    availability: new FormControl('')
  });

  teachSkillForm = new FormGroup({
  skillName: new FormControl(''),
  level: new FormControl('beginner')
});

addTeachSkill() {
  this.auth.addTeachSkill(this.teachSkillForm.value as any)
    .subscribe(() => {
      alert('Teach skill added');
      this.teachSkillForm.reset({ level: 'beginner' });
      this.loadProfile();
    });
}

learnSkillForm = new FormGroup({
  skillName: new FormControl('')
});

addLearnSkill() {
  this.auth.addLearnSkill(this.learnSkillForm.value as any)
    .subscribe(() => {
      alert('Learn skill added');
      this.learnSkillForm.reset();
      this.loadProfile();
    });
}


  constructor(private auth: AuthService) {
    this.loadProfile();
  }

  loadProfile() {
  this.auth.getProfile().subscribe((data) => {
    console.log('PROFILE RESPONSE:', data); // 👈 ADD THIS
    this.user = data;

    this.editForm.patchValue({
      bio: data.bio ?? '',
      availability: data.availability ?? ''
    });
  });
}

  save() {
    this.auth.updateProfile(this.editForm.value)
      .subscribe(() => {
        alert('Profile updated');
        this.loadProfile();
      });
  }
}
