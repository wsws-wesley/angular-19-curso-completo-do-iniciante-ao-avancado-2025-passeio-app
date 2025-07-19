import { Categoria } from '../categorias/categoria';
import { CategoriasService } from '../categorias/categorias.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LocaisService } from '../locais/locais.service';
import { Local } from '../locais/local';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {
  private categoriasService: CategoriasService = inject(CategoriasService);
  private locaisService: LocaisService = inject(LocaisService);
  private router: Router = inject(Router);

  public categorias: Categoria[] = [];
  public filterForm!: FormGroup;
  public locais: Local[] = [];

  public ngOnInit(): void {
    this.filterForm = new FormGroup({
      name: new FormControl('', []),
      category: new FormControl('', [])
    });

    this.categoriasService.get().subscribe({
      next: (categorias: Categoria[]) => this.categorias = categorias,
      error: (error: HttpErrorResponse) => console.error(error)
    });

    this.locaisService.get().subscribe({
      next: (locais: Local[]) => this.locais = locais,
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  public getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  public filterLocations(): void {
    this.locaisService.getByNameAndCategory(
      this.filterForm.get('name')!.value, 
      this.filterForm.get('category')!.value
    ).subscribe({
      next: (locais: Local[]) => this.locais = locais,
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  public navigateToLocalForm(idLocal: string): void {
    this.router.navigate(['/template/locais', idLocal]);
  }
}