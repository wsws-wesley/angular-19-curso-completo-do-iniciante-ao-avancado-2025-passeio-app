import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from './categorias.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  private categoriasService: CategoriasService = inject(CategoriasService);

  public categoryForm!: FormGroup;

  public ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  public save(): void {
    this.categoryForm.markAsTouched();    

    if (this.categoryForm.valid) {
      this.categoriasService.save(this.categoryForm.value).subscribe({
        error: (error: HttpErrorResponse) => console.error(error),
        complete: () => this.categoryForm.reset()
      });
    }
  }

  public isInvalidField(field: string): boolean {
    return (this.categoryForm.get(field)?.touched && this.categoryForm.get(field)?.invalid) ?? false;
  }
}