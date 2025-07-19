import { Categoria } from '../categorias/categoria';
import { CategoriasService } from '../categorias/categorias.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LocaisService } from './locais.service';
import { Rating } from '../shared/models/rating.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from './local';

@Component({
  selector: 'app-locais',
  standalone: false,
  templateUrl: './locais.component.html',
  styleUrl: './locais.component.scss'
})
export class LocaisComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private categoriasService: CategoriasService = inject(CategoriasService);
  private locaisService: LocaisService = inject(LocaisService);
  private router: Router = inject(Router);

  public categorias: Categoria[] = []
  public placeForm!: FormGroup;

  public ratings: Rating[] = [
    { 
      description: 'Ruim',
      rating: 1
    },
    { 
      description: 'Regular',
      rating: 2
    },
    { 
      description: 'Bom',
      rating: 3
    },
    { 
      description: 'Muito Bom',
      rating: 4
    },
    { 
      description: 'Excelente',
      rating: 5
    }
  ]

  public ngOnInit(): void {
    this.placeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      photoUrl: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required])
    });

    this.categoriasService.get().subscribe({
      next: (categorias: Categoria[]) => this.categorias = categorias,
      error: (error: HttpErrorResponse) => console.error(error)
    });

    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.locaisService.getById(id).subscribe({
        next: (local: Local) => {
          this.placeForm.patchValue({
            id: local.id,
            name: local.name,
            category: local.category,
            location: local.location,
            photoUrl: local.photoUrl,
            rating: local.rating
          });
        },
        error: (error: HttpErrorResponse) => console.error(error)
      });
    }
  }

  public save(): void {
    this.placeForm.markAllAsTouched();

    if (this.placeForm.valid) {
      this.locaisService.save(this.placeForm.value).subscribe({
        error: (error: HttpErrorResponse) => console.error(error),
        complete: () => this.placeForm.reset()      
      });
    }

    this.router.navigate(['/template/galeria']);
  }

  public isInvalidField(field: string): boolean {
    return (this.placeForm.get(field)?.touched && this.placeForm.get(field)?.invalid) ?? false;
  }
}