import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? null),
    price: new FormControl(this.data?.price ?? null),
    year: new FormControl(this.data?.year ?? null),
    chip: new FormControl(this.data?.configure?.chip ?? null),
    SSD: new FormControl(this.data?.configure?.SSD ?? null),
    RAM: new FormControl(this.data?.configure?.RAM ?? null),
    display: new FormControl(this.data?.configure?.display ?? null),
  });

  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/macbook.jpg",
      configure: {
        chip: this.myForm.value.chip,
        SSD: this.myForm.value.SSD,
        RAM: this.myForm.value.RAM,
        display: this.myForm.value.display,
       }
    }
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {

  }

  protected readonly onsubmit = onsubmit;
}
