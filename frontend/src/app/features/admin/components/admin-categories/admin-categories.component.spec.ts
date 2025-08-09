import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AdminCategoriesComponent } from './admin-categories.component';
import { CategoryService } from '@core/services/category.service';

const categories = Array.from({length: 25}).map((_, i) => ({ id: i+1, name: `Category ${i+1}` }));

describe('AdminCategoriesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoriesComponent, HttpClientTestingModule],
      providers: [{ provide: CategoryService, useValue: { getCategories: () => of(categories), deleteCategory: () => of(void 0) } }],
    }).compileComponents();
  });

  it('filters by search term', () => {
    const fixture = TestBed.createComponent(AdminCategoriesComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.searchTerm = 'Category 2';
    comp.applyFilter();
    expect(comp.filtered.every(c => c.name.includes('Category 2'))).toBeTrue();
  });

  it('paginates results', () => {
    const fixture = TestBed.createComponent(AdminCategoriesComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.pageSize = 5;
    comp.pageIndex = 2; // 3rd page
    const page = comp.paged;
    expect(page.length).toBe(5);
    expect(page[0].name).toBe('Category 11');
  });
});
