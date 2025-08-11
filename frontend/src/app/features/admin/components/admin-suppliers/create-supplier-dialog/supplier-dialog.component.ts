import { Component, Inject, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { SupplierService } from "@core/services/supplier.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
    selector: "app-create-supplier-dialog",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatTabsModule,
        MatDividerModule,
        MatIconModule,
        HttpClientModule,
    ],
    template: `
        <h2 mat-dialog-title>
            <mat-icon>business</mat-icon>
            {{ data ? 'Edit Supplier' : 'Add New Supplier' }}
        </h2>
        
        <mat-dialog-content class="dialog-content">
            <form [formGroup]="supplierForm">
                
                <mat-tab-group>
                    <!-- Basic Information Tab -->
                    <mat-tab label="Basic Info">
                        <div class="tab-content">
                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>Supplier Name</mat-label>
                    <input matInput formControlName="name" required>
                                    <mat-error *ngIf="supplierForm.get('name')?.hasError('required')">
                                        Supplier name is required
                                    </mat-error>
                                    <mat-error *ngIf="supplierForm.get('name')?.hasError('minlength')">
                                        Name must be at least 2 characters
                                    </mat-error>
                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Supplier Type</mat-label>
                    <mat-select formControlName="type" required (selectionChange)="onTypeChange()">
                                        <mat-option value="API">REST API</mat-option>
                                        <mat-option value="SOAP">SOAP Service</mat-option>
                                        <mat-option value="EXCEL">Excel File</mat-option>
                                        <mat-option value="CSV">CSV File</mat-option>
                                    </mat-select>
                                    <mat-error *ngIf="supplierForm.get('type')?.hasError('required')">
                                        Supplier type is required
                                    </mat-error>
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Contact Email</mat-label>
                                    <input matInput formControlName="contactEmail" type="email">
                                    <mat-error *ngIf="supplierForm.get('contactEmail')?.hasError('email')">
                                        Invalid email format
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-checkbox formControlName="active" class="full-width">
                                    <strong>Active Supplier</strong>
                                    <div class="checkbox-hint">Enable to allow product imports and operations</div>
                                </mat-checkbox>
                            </div>
                        </div>
                    </mat-tab>

                    <!-- API Configuration Tab -->
                    <mat-tab label="API Config" [disabled]="supplierForm.get('type')?.value !== 'API'">
                        <div class="tab-content" *ngIf="supplierForm.get('type')?.value === 'API'">
                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>API Base URL</mat-label>
                                    <input matInput formControlName="apiUrl" placeholder="https://api.supplier.com">
                                    <mat-error *ngIf="supplierForm.get('apiUrl')?.hasError('required')">
                                        API URL is required for API suppliers
                                    </mat-error>
                                    <mat-error *ngIf="supplierForm.get('apiUrl')?.hasError('pattern')">
                                        Must be a valid HTTP/HTTPS URL
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Authentication Method</mat-label>
                                    <mat-select formControlName="authMethod">
                                        <mat-option value="BEARER">Bearer Token</mat-option>
                                        <mat-option value="BASIC">Basic Auth</mat-option>
                                        <mat-option value="NONE">No Authentication</mat-option>
                                    </mat-select>
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Data Format</mat-label>
                                    <mat-select formControlName="dataFormat">
                                        <mat-option value="JSON">JSON</mat-option>
                                        <mat-option value="XML">XML</mat-option>
                    </mat-select>
                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>API Key / Token</mat-label>
                                    <input matInput formControlName="apiKey" type="password">
                                    <mat-error *ngIf="supplierForm.get('apiKey')?.hasError('required')">
                                        API Key is required for API suppliers
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Products Endpoint</mat-label>
                                    <input matInput formControlName="productsEndpoint" placeholder="/products">
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Single Product Endpoint</mat-label>
                                    <input matInput formControlName="singleEndpoint" placeholder="/product/{id}">
                </mat-form-field>
                            </div>
                        </div>
                    </mat-tab>

                    <!-- SOAP Configuration Tab -->
                    <mat-tab label="SOAP Config" [disabled]="supplierForm.get('type')?.value !== 'SOAP'">
                        <div class="tab-content" *ngIf="supplierForm.get('type')?.value === 'SOAP'">
                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                        <mat-label>WSDL URL</mat-label>
                                    <input matInput formControlName="wsdlUrl" (blur)="loadSoapOperations()" 
                                           placeholder="http://supplier.com/ws?wsdl">
                                    <mat-hint>Enter WSDL URL to automatically load available operations</mat-hint>
                                    <mat-error *ngIf="supplierForm.get('wsdlUrl')?.hasError('required')">
                                        WSDL URL is required for SOAP suppliers
                                    </mat-error>
                                    <mat-error *ngIf="supplierForm.get('wsdlUrl')?.hasError('pattern')">
                                        Must be a valid HTTP/HTTPS URL
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>Namespace</mat-label>
                                    <input matInput formControlName="namespace" placeholder="http://supplier.com/ws">
                                    <mat-error *ngIf="supplierForm.get('namespace')?.hasError('required')">
                                        Namespace is required for SOAP suppliers
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Username (Optional)</mat-label>
                                    <input matInput formControlName="username">
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Password (Optional)</mat-label>
                                    <input matInput formControlName="password" type="password">
                    </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                        <mat-label>SOAP Operation</mat-label>
                                    <mat-select formControlName="operation" [disabled]="soapOperations.length === 0 || loadingOps">
                            <mat-option *ngFor="let op of soapOperations" [value]="op">
                                {{ op }}
                            </mat-option>
                        </mat-select>
                                    <mat-progress-spinner *ngIf="loadingOps" diameter="20" mode="indeterminate"></mat-progress-spinner>
                                    <mat-hint *ngIf="soapOperations.length === 0 && !loadingOps">
                                        Enter WSDL URL above to load operations
                                    </mat-hint>
                                </mat-form-field>
                            </div>
                        </div>
                    </mat-tab>

                    <!-- File Configuration Tab -->
                    <mat-tab label="File Config" [disabled]="!['EXCEL', 'CSV'].includes(supplierForm.get('type')?.value)">
                        <div class="tab-content" *ngIf="['EXCEL', 'CSV'].includes(supplierForm.get('type')?.value)">
                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>File Name</mat-label>
                                    <input matInput formControlName="fileName" placeholder="products.xlsx">
                                    <mat-error *ngIf="supplierForm.get('fileName')?.hasError('required')">
                                        File name is required
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>File Path / URL</mat-label>
                                    <input matInput formControlName="filePath" 
                                           placeholder="/uploads/supplier-files/ or https://supplier.com/products.xlsx">
                                    <mat-error *ngIf="supplierForm.get('filePath')?.hasError('required')">
                                        File path is required
                                    </mat-error>
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <div class="file-upload-section">
                                    <h4>Upload Template File</h4>
                                    <p class="upload-hint">
                                        Upload an Excel file with product data. 
                                        <a href="/assets/excel-template.xlsx" download>Download template</a>
                                    </p>
                                    <input type="file" 
                                           #fileInput 
                                           accept=".xlsx,.xls,.csv" 
                                           (change)="onFileSelected($event)"
                                           style="display: none;">
                                    <button mat-stroked-button 
                                            type="button"
                                            (click)="fileInput.click()"
                                            [disabled]="uploadingFile">
                                        <mat-icon>upload_file</mat-icon>
                                        <span *ngIf="!uploadingFile">Choose File</span>
                                        <span *ngIf="uploadingFile">Uploading...</span>
                                    </button>
                                    <span *ngIf="selectedFile" class="file-info">
                                        {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </mat-tab>

                    <!-- Payment Configuration Tab -->
                    <mat-tab label="Payment Settings">
                        <div class="tab-content">
                            <div class="form-row">
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Payout Frequency</mat-label>
                                    <mat-select formControlName="payoutFrequency">
                                        <mat-option value="DAILY">Daily</mat-option>
                                        <mat-option value="WEEKLY">Weekly</mat-option>
                                        <mat-option value="MONTHLY">Monthly</mat-option>
                                        <mat-option value="CUSTOM">Custom Schedule</mat-option>
                                    </mat-select>
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Payment Hour (24h format)</mat-label>
                                    <input matInput formControlName="customPaymentHour" type="number" min="0" max="23">
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-checkbox formControlName="hasOwnPaymentSystem" class="full-width">
                                    <strong>Supplier Has Own Payment System</strong>
                                    <div class="checkbox-hint">Enable if supplier handles payments directly</div>
                                </mat-checkbox>
                            </div>

                            <div class="form-row" *ngIf="supplierForm.get('hasOwnPaymentSystem')?.value">
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Payment API Endpoint</mat-label>
                                    <input matInput formControlName="paymentApiEndpoint" 
                                           placeholder="https://supplier.com/api/payments">
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="half-width">
                                    <mat-label>Commission API Endpoint</mat-label>
                                    <input matInput formControlName="commissionApiEndpoint" 
                                           placeholder="https://supplier.com/api/commissions">
                                </mat-form-field>
                            </div>

                            <div class="form-row">
                                <mat-form-field appearance="outline" class="third-width">
                                    <mat-label>Min Payment Amount (€)</mat-label>
                                    <input matInput formControlName="minimumPaymentAmount" type="number" min="1">
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="third-width">
                                    <mat-label>Max Payment Delay (days)</mat-label>
                                    <input matInput formControlName="maximumPaymentDelay" type="number" min="1" max="365">
                                </mat-form-field>
                                
                                <mat-form-field appearance="outline" class="third-width" 
                                              *ngIf="supplierForm.get('payoutFrequency')?.value === 'CUSTOM'">
                                    <mat-label>Custom Payment Days</mat-label>
                                    <input matInput formControlName="customPaymentDays" 
                                           placeholder="1,15 (for 1st and 15th)">
                    </mat-form-field>
                            </div>
                        </div>
                    </mat-tab>
                </mat-tab-group>

            </form>
        </mat-dialog-content>
        
        <mat-dialog-actions align="end" class="dialog-actions">
            <button mat-button (click)="onCancel()" [disabled]="loadingOps">
                Cancel
            </button>
            <button mat-raised-button color="primary"
                    (click)="onSave()"
                    [disabled]="supplierForm.invalid || loadingOps">
                <mat-progress-spinner *ngIf="loadingOps" diameter="20" mode="indeterminate"></mat-progress-spinner>
                <span *ngIf="!loadingOps">
                    <mat-icon>{{ data ? 'edit' : 'add' }}</mat-icon>
                    {{ data ? 'Update Supplier' : 'Create Supplier' }}
                </span>
            </button>
        </mat-dialog-actions>
    `,
    styles: [`
        .dialog-content {
            max-height: 70vh;
            overflow-y: auto;
            padding: 0;
        }

        .tab-content {
            padding: 24px;
            min-height: 400px;
        }

        .form-row {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
            align-items: flex-start;
        }

        .full-width {
            width: 100%;
        }

        .half-width {
            width: calc(50% - 8px);
        }

        .third-width {
            width: calc(33.333% - 11px);
        }

        .checkbox-hint {
            font-size: 12px;
            color: rgba(0,0,0,0.6);
            margin-top: 4px;
        }

        .dialog-actions {
            padding: 16px 24px;
            border-top: 1px solid rgba(0,0,0,0.12);
        }

        mat-dialog-title {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 0;
            padding: 24px 24px 0 24px;
        }

        mat-progress-spinner {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
        }

        mat-tab-group {
            border: none;
        }

        .mat-mdc-tab-group .mat-mdc-tab-body-wrapper {
            flex-grow: 1;
        }

        .file-upload-section {
            border: 2px dashed #ddd;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            width: 100%;
        }

        .file-upload-section h4 {
            margin: 0 0 8px 0;
            color: #333;
        }

        .upload-hint {
            margin: 8px 0 16px 0;
            color: #666;
            font-size: 14px;
        }

        .file-info {
            margin-left: 12px;
            font-size: 14px;
            color: #666;
        }

        .upload-hint a {
            color: #1976d2;
            text-decoration: none;
        }

        .upload-hint a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .form-row {
                flex-direction: column;
                gap: 0;
            }
            
            .half-width, .third-width {
                width: 100%;
            }
            
            .dialog-content {
                max-height: 60vh;
            }
        }
    `]
})
export class CreateSupplierDialogComponent {
    supplierForm: FormGroup;
    loadingOps = false;
    soapOperations: string[] = [];
    selectedFile: File | null = null;
    uploadingFile = false;

    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<CreateSupplierDialogComponent>);
    private supplierService = inject(SupplierService);
    private http = inject(HttpClient);
 private snackBar = inject(MatSnackBar);

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.supplierForm = this.fb.group({
            // Basic Information
            name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
            type: [data?.type || 'API', Validators.required],
            contactEmail: [data?.contactEmail || '', [Validators.email]],
            active: [data?.active !== false, Validators.required],
            
            // API Supplier Fields
            apiUrl: [data?.apiUrl || ''],
            authMethod: [data?.authMethod || 'BEARER'],
            apiKey: [data?.apiKey || ''],
            dataFormat: [data?.dataFormat || 'JSON'],
            productsEndpoint: [data?.productsEndpoint || '/products'],
            singleEndpoint: [data?.singleEndpoint || ''],
            
            // SOAP Supplier Fields
            wsdlUrl: [data?.wsdlUrl || ''],
            namespace: [data?.namespace || ''],
            username: [data?.username || ''],
            password: [data?.password || ''],
            operation: [data?.operation || ''],
            
            // Excel Supplier Fields
            fileName: [data?.fileName || ''],
            filePath: [data?.filePath || ''],
            
            // Payment Configuration
            payoutFrequency: [data?.payoutFrequency || 'WEEKLY'],
            hasOwnPaymentSystem: [data?.hasOwnPaymentSystem || false],
            paymentApiEndpoint: [data?.paymentApiEndpoint || ''],
            commissionApiEndpoint: [data?.commissionApiEndpoint || ''],
            customPaymentSchedule: [data?.customPaymentSchedule || ''],
            customPaymentDays: [data?.customPaymentDays || ''],
            customPaymentHour: [data?.customPaymentHour || 18, [Validators.min(0), Validators.max(23)]],
            minimumPaymentAmount: [data?.minimumPaymentAmount || 50, [Validators.min(1)]],
            maximumPaymentDelay: [data?.maximumPaymentDelay || 30, [Validators.min(1), Validators.max(365)]]
        });
        
        // Update validators based on type
        this.updateValidators();
    }

    updateValidators(): void {
        const type = this.supplierForm.get('type')?.value;
        
        // Clear all validators first
        Object.keys(this.supplierForm.controls).forEach(key => {
            if (['name', 'type', 'active'].includes(key)) return; // Keep basic validators
            this.supplierForm.get(key)?.clearValidators();
        });
        
        // Add validators based on type
        switch(type) {
            case 'API':
                this.supplierForm.get('apiUrl')?.setValidators([Validators.required, Validators.pattern(/^https?:\/\/.+/)]);
                this.supplierForm.get('apiKey')?.setValidators([Validators.required]);
                break;
            case 'SOAP':
                this.supplierForm.get('wsdlUrl')?.setValidators([Validators.required, Validators.pattern(/^https?:\/\/.+/)]);
                this.supplierForm.get('namespace')?.setValidators([Validators.required]);
                break;
            case 'EXCEL':
                this.supplierForm.get('fileName')?.setValidators([Validators.required]);
                this.supplierForm.get('filePath')?.setValidators([Validators.required]);
                break;
        }
        
        // Update form validity
        Object.keys(this.supplierForm.controls).forEach(key => {
            this.supplierForm.get(key)?.updateValueAndValidity();
        });
    }

    onTypeChange(): void {
        this.updateValidators();
        
        // Clear type-specific fields
        const type = this.supplierForm.get('type')?.value;
        if (type !== 'SOAP') {
            this.supplierForm.patchValue({ wsdlUrl: '', operation: '', namespace: '', username: '', password: '' });
            this.soapOperations = [];
        }
        if (type !== 'API') {
            this.supplierForm.patchValue({ apiUrl: '', apiKey: '', authMethod: 'BEARER', dataFormat: 'JSON', productsEndpoint: '/products', singleEndpoint: '' });
        }
        if (type !== 'EXCEL') {
            this.supplierForm.patchValue({ fileName: '', filePath: '' });
        }
    }

    loadSoapOperations(): void {
        const wsdlUrl = this.supplierForm.get('wsdlUrl')?.value;
        if (!wsdlUrl) return;
        this.loadingOps = true;
        // Fetch the WSDL and parse for operation names
        this.http.get(wsdlUrl, { responseType: 'text' }).subscribe({
            next: (wsdl: string) => {
                // Extract <wsdl:operation name="...">
                const matches = Array.from(wsdl.matchAll(/<wsdl:operation[^>]*name="([^"]+)"/g));
                this.soapOperations = matches.map((m: RegExpMatchArray) => m[1]);
                this.loadingOps = false;
            },
            error: (error: any) => {
                console.error('Failed to load SOAP operations:', error);
                this.soapOperations = [];
                this.loadingOps = false;
            }
        });
    }

        onSave(): void {
        if (this.supplierForm.invalid) return;
        const supplier = this.supplierForm.value;
        
        if (this.data) {
            // Update existing supplier
            this.supplierService.updateSupplier(this.data.id, supplier).subscribe({
                next: () => {
                    this.snackBar.open('Supplier updated successfully!', 'Close', {
                        duration: 3000,
                    });
                    this.dialogRef.close(true);
                },
                error: (error: any) => {
                    console.error('Error updating supplier:', error);
                    this.snackBar.open('Failed to update supplier.', 'Close', {
                        duration: 3000,
                    });
                }
            });
        } else {
            // Create new supplier - send complete form data
            const createRequest$ = supplier.type === 'SOAP' 
                ? this.supplierService.createSupplierAutoSoap(supplier)
                : this.supplierService.createSupplier(supplier);
            
            createRequest$.subscribe({
                next: (created: any) => {
                    // Auto-refresh metadata for SOAP suppliers
                    if (supplier.type === 'SOAP' && created?.id) {
                        this.supplierService.refreshMetadata(created.id).subscribe({
                            next: () => {
                                this.snackBar.open('Supplier created and metadata loaded!', 'Close', { duration: 3000 });
                                this.dialogRef.close(true);
                            },
                            error: () => {
                                this.snackBar.open('Supplier created but metadata refresh failed.', 'Close', { duration: 3000 });
                                this.dialogRef.close(true);
                            }
                        });
                    } else {
                        this.snackBar.open('Supplier created successfully!', 'Close', { duration: 3000 });
                        this.dialogRef.close(true);
                    }
                },
                error: (error: any) => {
                    console.error('Error creating supplier:', error);
                    const errorMsg = error?.error?.message || 'Failed to create supplier.';
                    this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
                }
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file) {
            this.selectedFile = file;
            this.uploadingFile = true;
            
            // Upload file to server
            this.supplierService.uploadSupplierFile(file).subscribe({
                next: (response) => {
                    this.uploadingFile = false;
                    if (response.success) {
                        // Update form with server response
                        this.supplierForm.patchValue({
                            fileName: response.fileName,
                            filePath: response.filePath
                        });
                        this.snackBar.open('File uploaded successfully!', 'Close', {
                            duration: 3000
                        });
                    } else {
                        this.snackBar.open(response.message || 'File upload failed', 'Close', {
                            duration: 3000
                        });
                        this.selectedFile = null;
                    }
                },
                error: (error) => {
                    this.uploadingFile = false;
                    this.selectedFile = null;
                    console.error('File upload error:', error);
                    const errorMsg = error?.error?.message || 'File upload failed';
                    this.snackBar.open(errorMsg, 'Close', {
                        duration: 3000
                    });
                }
            });
        }
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
