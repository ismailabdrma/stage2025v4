import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '@core/services/product.service';
import { SupplierService } from '@core/services/supplier.service';
import type { Product } from '@core/models/product.model';

const mockProducts: Product[] = [
  { id: 1, name: 'A', description: '', displayedPrice: 10, categoryName: 'Cat', supplierName: 'Sup', imageUrls: [], active: true },
  { id: 2, name: 'B', description: '', displayedPrice: 5, categoryName: 'Cat', supplierName: 'Sup', imageUrls: [], active: true },
];

const mockSuppliers = [ { id: 1, name: 'Sup', type: 'API', active: true } ];

describe('ProductListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: { getAllProducts: () => of(mockProducts), getAllCategories: () => of([]) } },
        { provide: SupplierService, useValue: { getAllSuppliers: () => of(mockSuppliers) } },
      ],
    }).compileComponents();
  });

  it('should sort by price ascending', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.sortBy = 'priceAsc';
    // @ts-expect-error access private for test
    const sorted = comp['applyLocalSort'](mockProducts.slice());
    expect(sorted[0].displayedPrice).toBe(5);
  });

  it('loads suppliers for filtering', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    expect(comp.suppliers.length).toBe(1);
    expect(comp.suppliers[0].name).toBe('Sup');
  });
});
