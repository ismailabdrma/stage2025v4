import { Component, Inject, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
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
        MatProgressBarModule,
        MatIconModule,
        MatCheckboxModule,
        MatTabsModule,
        MatDividerModule,
        HttpClientModule,
    ],
    template: `
        <div class="supplier-dialog">
            <h2 mat-dialog-title>
                <mat-icon>{{ data ? 'edit' : 'add_business' }}</mat-icon>
                {{ data ? 'Edit Supplier' : 'Add New Supplier' }}
            </h2>
            
            <mat-dialog-content class="dialog-content">
                <mat-tab-group [selectedIndex]="selectedTabIndex" (selectedTabChange)="onTabChange($event)">
                    <!-- Basic Information Tab -->
                    <mat-tab label="Basic Information">
                        <div class="tab-content">
                            <form [formGroup]="supplierForm" class="supplier-form">
                                <!-- Name and Email Row -->
                                <div class="form-row">
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Supplier Name</mat-label>
                                        <input matInput formControlName="name" required placeholder="Enter supplier name">
                                        <mat-icon matSuffix>business</mat-icon>
                                        <mat-error *ngIf="supplierForm.get('name')?.hasError('required')">
                                            Supplier name is required
                                        </mat-error>
                                    </mat-form-field>
                                    
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Contact Email</mat-label>
                                        <input matInput formControlName="email" type="email" placeholder="supplier@company.com">
                                        <mat-icon matSuffix>email</mat-icon>
                                        <mat-error *ngIf="supplierForm.get('email')?.hasError('email')">
                                            Please enter a valid email address
                                        </mat-error>
                                    </mat-form-field>
                                </div>
                                
                                <!-- Supplier Type -->
                                <mat-form-field appearance="outline" class="full-width">
                                    <mat-label>Supplier Type</mat-label>
                                    <mat-select formControlName="type" required (selectionChange)="onTypeChange()">
                                        <mat-option value="API">
                                            <mat-icon>api</mat-icon>
                                            REST API Integration
                                        </mat-option>
                                        <mat-option value="SOAP">
                                            <mat-icon>soap</mat-icon>
                                            SOAP Web Service
                                        </mat-option>
                                        <mat-option value="EXCEL">
                                            <mat-icon>table_view</mat-icon>
                                            Excel File Upload
                                        </mat-option>
                                        <mat-option value="CSV">
                                            <mat-icon>insert_drive_file</mat-icon>
                                            CSV File Upload
                                        </mat-option>
                                    </mat-select>
                                    <mat-error *ngIf="supplierForm.get('type')?.hasError('required')">
                                        Please select a supplier type
                                    </mat-error>
                                </mat-form-field>

                                <!-- Type Description -->
                                <div class="type-description" *ngIf="supplierForm.get('type')?.value">
                                    <mat-icon [color]="'primary'">info</mat-icon>
                                    <span>{{ getTypeDescription() }}</span>
                                </div>
                            </form>
                        </div>
                    </mat-tab>

                    <!-- Configuration Tab -->
                    <mat-tab label="Configuration" [disabled]="!supplierForm.get('type')?.value">
                        <div class="tab-content">
                            <form [formGroup]="supplierForm" class="supplier-form">
                                
                                <!-- API Configuration -->
                                <ng-container *ngIf="supplierForm.get('type')?.value === 'API'">
                                    <h3 class="section-title">
                                        <mat-icon>api</mat-icon>
                                        API Configuration
                                    </h3>
                                    
                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>Base API URL</mat-label>
                                        <input matInput formControlName="apiUrl" required 
                                               placeholder="https://api.supplier.com">
                                        <mat-icon matSuffix>link</mat-icon>
                                        <mat-hint>Base URL of the supplier API</mat-hint>
                                        <mat-error *ngIf="supplierForm.get('apiUrl')?.hasError('required')">
                                            Base API URL is required
                                        </mat-error>
                                    </mat-form-field>
                                    
                                    <div class="form-row">
                                        <mat-form-field appearance="outline" class="half-width">
                                            <mat-label>API Key (optional)</mat-label>
                                            <input matInput formControlName="apiKey" placeholder="Your API key">
                                            <mat-icon matSuffix>vpn_key</mat-icon>
                                        </mat-form-field>
                                        
                                        <mat-form-field appearance="outline" class="half-width">
                                            <mat-label>Authentication Method</mat-label>
                                            <mat-select formControlName="authMethod">
                                                <mat-option value="">None</mat-option>
                                                <mat-option value="API_KEY">API Key</mat-option>
                                                <mat-option value="BEARER_TOKEN">Bearer Token</mat-option>
                                                <mat-option value="BASIC_AUTH">Basic Auth</mat-option>
                                            </mat-select>
                                        </mat-form-field>
                                    </div>

                                    <div class="form-row">
                                        <mat-form-field appearance="outline" class="half-width">
                                            <mat-label>Products Endpoint</mat-label>
                                            <input matInput formControlName="productsEndpoint" placeholder="/products">
                                            <mat-hint>Endpoint to list products</mat-hint>
                                        </mat-form-field>
                                        <mat-form-field appearance="outline" class="half-width">
                                            <mat-label>Single Product Endpoint</mat-label>
                                            <input matInput formControlName="singleEndpoint" placeholder="/product/{id}">
                                            <mat-hint>Endpoint to fetch a single product</mat-hint>
                                        </mat-form-field>
                                    </div>

                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>Data Format</mat-label>
                                        <mat-select formControlName="dataFormat">
                                            <mat-option value="JSON">JSON</mat-option>
                                            <mat-option value="XML">XML</mat-option>
                                        </mat-select>
                                    </mat-form-field>
                                </ng-container>

                                <!-- SOAP Configuration -->
                                <ng-container *ngIf="supplierForm.get('type')?.value === 'SOAP'">
                                    <h3 class="section-title">
                                        <mat-icon>soap</mat-icon>
                                        SOAP Web Service Configuration
                                    </h3>
                                    
                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>WSDL URL</mat-label>
                                        <input matInput formControlName="wsdlUrl" (blur)="loadSoapOperations()" required
                                               placeholder="https://supplier.com/service.wsdl">
                                        <mat-icon matSuffix>description</mat-icon>
                                        <mat-hint>Enter WSDL URL to automatically load available operations</mat-hint>
                                        <mat-error *ngIf="supplierForm.get('wsdlUrl')?.hasError('required')">
                                            WSDL URL is required
                                        </mat-error>
                                    </mat-form-field>
                                    
                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>Service Namespace</mat-label>
                                        <input matInput formControlName="namespace"
                                               placeholder="http://supplier.com/ws">
                                        <mat-icon matSuffix>schema</mat-icon>
                                        <mat-hint>Optional: only if your SOAP service requires it</mat-hint>
                                    </mat-form-field>
                                    
                                    <div class="form-row">
                                        <mat-form-field appearance="outline" class="half-width">
                                            <mat-label>Username (optional)</mat-label>
                                            <input matInput formControlName="username" placeholder="Username">
                                            <mat-icon matSuffix>person</mat-icon>
                                        </mat-form-field>
                                        
                                        <mat-form-field appearance="outline" class="half-width">
                                            <mat-label>Password (optional)</mat-label>
                                            <input matInput type="password" formControlName="password" placeholder="Password">
                                            <mat-icon matSuffix>lock</mat-icon>
                                        </mat-form-field>
                                    </div>

                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>SOAP Payment Operation (optional)</mat-label>
                                        <mat-select formControlName="paymentOperationName" [disabled]="soapOperations.length === 0">
                                            <mat-option value="">Auto-detect after creation</mat-option>
                                            <mat-option *ngFor="let op of soapOperations" [value]="op">{{ op }}</mat-option>
                                        </mat-select>
                                        <mat-progress-spinner *ngIf="loadingOps" diameter="24" mode="indeterminate"></mat-progress-spinner>
                                    </mat-form-field>

                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>SOAP Refund Operation (optional)</mat-label>
                                        <mat-select formControlName="refundOperationName" [disabled]="soapOperations.length === 0">
                                            <mat-option value="">None</mat-option>
                                            <mat-option *ngFor="let op of soapOperations" [value]="op">{{ op }}</mat-option>
                                        </mat-select>
                                    </mat-form-field>

                                    <mat-form-field appearance="outline" class="full-width">
                                        <mat-label>SOAP Success Operation (optional)</mat-label>
                                        <input matInput formControlName="successOperationName" 
                                               placeholder="notifyPaymentStatus">
                                        <mat-icon matSuffix>check_circle</mat-icon>
                                        <mat-hint>Operation to notify payment status (default: notifyPaymentStatus)</mat-hint>
                                    </mat-form-field>

                                    <!-- Payment System Configuration Section -->
                                    <h4 class="subsection-title">
                                        <mat-icon>payment</mat-icon>
                                        Payment System Configuration
                                    </h4>
                                    
                                    <div class="form-row">
                                        <mat-checkbox formControlName="hasOwnPaymentSystem" 
                                                     (change)="updatePaymentValidators()">
                                            Supplier handles customer payment directly
                                        </mat-checkbox>
                                        <mat-checkbox formControlName="autoPaymentEnabled">
                                            Enable automatic payment processing
                                        </mat-checkbox>
                                    </div>

                                    <!-- SOAP Payment Configuration -->
                                    <div *ngIf="supplierForm.get('hasOwnPaymentSystem')?.value && supplierForm.get('type')?.value === 'SOAP'">
                                        <div class="payment-config-section">
                                            <h5 class="payment-section-title">
                                                <mat-icon>soap</mat-icon>
                                                SOAP Payment Configuration
                                            </h5>
                                            
                                            <mat-form-field appearance="outline" class="full-width">
                                                <mat-label>Payment WSDL URL *</mat-label>
                                                <input matInput formControlName="paymentWsdlUrl" 
                                                       [placeholder]="supplierForm.get('wsdlUrl')?.value || 'https://supplier.com/payment.wsdl'"
                                                       (blur)="loadPaymentSoapOperations()"
                                                       required>
                                                <mat-icon matSuffix>payment</mat-icon>
                                                <mat-hint>Separate WSDL for payment operations (defaults to main WSDL if empty)</mat-hint>
                                                <mat-error *ngIf="supplierForm.get('paymentWsdlUrl')?.hasError('required')">
                                                    Payment WSDL URL is required for SOAP payment system
                                                </mat-error>
                                            </mat-form-field>

                                            <mat-form-field appearance="outline" class="full-width">
                                                <mat-label>Payment Operation Name *</mat-label>
                                                <mat-select formControlName="paymentOperationNameConfig" 
                                                           [disabled]="paymentSoapOperations.length === 0"
                                                           required>
                                                    <mat-option value="">Select payment operation</mat-option>
                                                    <mat-option *ngFor="let op of paymentSoapOperations" [value]="op">{{ op }}</mat-option>
                                                </mat-select>
                                                <mat-icon matSuffix>settings</mat-icon>
                                                <mat-hint>Select the operation for payment processing from payment WSDL</mat-hint>
                                                <mat-error *ngIf="supplierForm.get('paymentOperationNameConfig')?.hasError('required')">
                                                    Payment operation is required for SOAP payment system
                                                </mat-error>
                                            </mat-form-field>

                                            <mat-form-field appearance="outline" class="full-width">
                                                <mat-label>SOAP Action for Payment *</mat-label>
                                                <input matInput formControlName="soapAction" 
                                                       placeholder="http://tempuri.org/ProcessPayment"
                                                       required>
                                                <mat-icon matSuffix>code</mat-icon>
                                                <mat-hint>SOAP action header for payment operations</mat-hint>
                                                <mat-error *ngIf="supplierForm.get('soapAction')?.hasError('required')">
                                                    SOAP action is required for SOAP payment system
                                                </mat-error>
                                            </mat-form-field>
                                        </div>
                                    </div>

                                    <!-- API Payment Configuration -->
                                    <div *ngIf="supplierForm.get('hasOwnPaymentSystem')?.value && supplierForm.get('type')?.value === 'API'">
                                        <div class="payment-config-section">
                                            <h5 class="payment-section-title">
                                                <mat-icon>api</mat-icon>
                                                API Payment Configuration
                                            </h5>
                                            
                                            <mat-form-field appearance="outline" class="full-width">
                                                <mat-label>Payment API Endpoint *</mat-label>
                                                <input matInput formControlName="paymentApiEndpoint" 
                                                       placeholder="https://supplier.com/payments"
                                                       required>
                                                <mat-icon matSuffix>link</mat-icon>
                                                <mat-hint>API endpoint for payment processing</mat-hint>
                                                <mat-error *ngIf="supplierForm.get('paymentApiEndpoint')?.hasError('required')">
                                                    Payment API endpoint is required for API payment system
                                                </mat-error>
                                            </mat-form-field>

                                            <mat-form-field appearance="outline" class="full-width">
                                                <mat-label>Commission API Endpoint *</mat-label>
                                                <input matInput formControlName="commissionApiEndpoint" 
                                                       placeholder="https://supplier.com/commission"
                                                       required>
                                                <mat-icon matSuffix>account_balance</mat-icon>
                                                <mat-hint>API endpoint for commission handling</mat-hint>
                                                <mat-error *ngIf="supplierForm.get('commissionApiEndpoint')?.hasError('required')">
                                                    Commission API endpoint is required for API payment system
                                                </mat-error>
                                            </mat-form-field>
                                        </div>
                                    </div>

                                    <!-- Platform payment configuration when supplier doesn't handle payments -->
                                    <div *ngIf="!supplierForm.get('hasOwnPaymentSystem')?.value">
                                        <div class="payment-config-section">
                                            <h5 class="payment-section-title">
                                                <mat-icon>account_balance</mat-icon>
                                                Platform Payment Configuration
                                            </h5>
                                            
                                            <mat-form-field appearance="outline" class="full-width">
                                                <mat-label>Platform Payment API Endpoint</mat-label>
                                                <input matInput formControlName="paymentApiEndpoint" 
                                                       placeholder="https://platform.com/payments">
                                                <mat-icon matSuffix>link</mat-icon>
                                                <mat-hint>Platform endpoint for handling payments to this supplier</mat-hint>
                                            </mat-form-field>
                                        </div>
                                    </div>
                                </ng-container>
                            </form>
                        </div>
                    </mat-tab>

                    <!-- Payment Configuration Tab -->
                    <mat-tab label="Payment" >
                        <div class="tab-content">
                            <form [formGroup]="supplierForm" class="supplier-form">
                                <div class="form-row">
                                    <mat-checkbox formControlName="hasOwnPaymentSystem">Supplier handles customer payment directly</mat-checkbox>
                                </div>
                                <div class="form-row" *ngIf="supplierForm.get('hasOwnPaymentSystem')?.value">
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Supplier Payment API Endpoint</mat-label>
                                        <input matInput formControlName="paymentApiEndpoint" placeholder="https://supplier.com/payments">
                                        <mat-icon matSuffix>link</mat-icon>
                                    </mat-form-field>
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Commission API Endpoint</mat-label>
                                        <input matInput formControlName="commissionApiEndpoint" placeholder="https://supplier.com/commission">
                                        <mat-icon matSuffix>link</mat-icon>
                                    </mat-form-field>
                                </div>
                                <div class="form-row" *ngIf="!supplierForm.get('hasOwnPaymentSystem')?.value">
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Payout Frequency</mat-label>
                                        <mat-select formControlName="payoutFrequency">
                                            <mat-option value="DAILY">Daily</mat-option>
                                            <mat-option value="WEEKLY">Weekly</mat-option>
                                            <mat-option value="MONTHLY">Monthly</mat-option>
                                            <mat-option value="CUSTOM">Custom</mat-option>
                                        </mat-select>
                                    </mat-form-field>
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Custom Schedule</mat-label>
                                        <input matInput formControlName="customPaymentSchedule" placeholder="EVERY_15_DAYS">
                                        <mat-hint>Used when frequency is CUSTOM</mat-hint>
                                    </mat-form-field>
                                </div>
                                <div class="form-row" *ngIf="!supplierForm.get('hasOwnPaymentSystem')?.value">
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Custom Payment Days</mat-label>
                                        <input matInput formControlName="customPaymentDays" placeholder="1,15">
                                    </mat-form-field>
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Payment Hour (0-23)</mat-label>
                                        <input matInput type="number" formControlName="customPaymentHour" min="0" max="23">
                                    </mat-form-field>
                                </div>
                                <div class="form-row" *ngIf="!supplierForm.get('hasOwnPaymentSystem')?.value">
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Minimum Payment Amount</mat-label>
                                        <input matInput type="number" formControlName="minimumPaymentAmount" min="0">
                                    </mat-form-field>
                                    <mat-form-field appearance="outline" class="half-width">
                                        <mat-label>Maximum Payment Delay (days)</mat-label>
                                        <input matInput type="number" formControlName="maximumPaymentDelay" min="0">
                                    </mat-form-field>
                                </div>
                            </form>
                        </div>
                    </mat-tab>

                    <!-- File Upload Tab (for Excel/CSV) -->
                    <mat-tab label="File Upload" 
                             [disabled]="!supplierForm.get('type')?.value || (supplierForm.get('type')?.value !== 'EXCEL' && supplierForm.get('type')?.value !== 'CSV')"
                             *ngIf="supplierForm.get('type')?.value === 'EXCEL' || supplierForm.get('type')?.value === 'CSV'">
                        <div class="tab-content">
                            <div class="file-upload-container">
                                <h3 class="section-title">
                                    <mat-icon>cloud_upload</mat-icon>
                                    Upload {{ supplierForm.get('type')?.value }} File
                                </h3>
                                
                                <div class="upload-area" 
                                     [class.dragover]="isDragOver"
                                     (dragover)="onDragOver($event)" 
                                     (dragleave)="onDragLeave($event)"
                                     (drop)="onDrop($event)">
                                    <mat-icon class="upload-icon">cloud_upload</mat-icon>
                                    <p class="upload-text">
                                        Drag and drop your {{ supplierForm.get('type')?.value }} file here, or 
                                        <button type="button" mat-button color="primary" (click)="fileInput.click()">
                                            browse files
                                        </button>
                                    </p>
                                    <p class="upload-hint">
                                        Supported formats: {{ supplierForm.get('type')?.value === 'EXCEL' ? '.xlsx, .xls' : '.csv' }}
                                        (Max size: 10MB)
                                    </p>
                                    
                                    <input #fileInput type="file" 
                                           [accept]="supplierForm.get('type')?.value === 'EXCEL' ? '.xlsx,.xls' : '.csv'"
                                           (change)="onFileSelected($event)" 
                                           style="display: none;">
                                </div>
                                
                                <div *ngIf="selectedFile" class="selected-file">
                                    <mat-icon>{{ supplierForm.get('type')?.value === 'EXCEL' ? 'table_view' : 'insert_drive_file' }}</mat-icon>
                                    <span class="file-name">{{ selectedFile.name }}</span>
                                    <span class="file-size">({{ formatFileSize(selectedFile.size) }})</span>
                                    <button mat-icon-button (click)="removeFile()" matTooltip="Remove file">
                                        <mat-icon>close</mat-icon>
                                    </button>
                                </div>
                                
                                <div *ngIf="uploadProgress > 0" class="upload-progress">
                                    <mat-progress-bar [value]="uploadProgress" mode="determinate"></mat-progress-bar>
                                    <span>{{ uploadProgress }}% uploaded</span>
                                </div>
                            </div>
                        </div>
                    </mat-tab>
                </mat-tab-group>
        </mat-dialog-content>
            
            <mat-divider></mat-divider>
            
            <mat-dialog-actions align="end" class="dialog-actions">
                <button mat-button (click)="onCancel()" [disabled]="saving">
                    <mat-icon>cancel</mat-icon>
                    Cancel
                </button>
                
            <button mat-raised-button color="primary"
                    (click)="onSave()"
                        [disabled]="saving">
                    <mat-spinner *ngIf="saving" diameter="20"></mat-spinner>
                    <mat-icon *ngIf="!saving">{{ data ? 'save' : 'add' }}</mat-icon>
                    {{ data ? 'Update Supplier' : 'Create Supplier' }}
            </button>
        </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .supplier-dialog {
            min-width: 600px;
            max-width: 800px;
        }

        .dialog-content {
            padding: 0;
            max-height: 70vh;
            overflow-y: auto;
        }

        .tab-content {
            padding: 24px;
        }

        .supplier-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .form-row {
            display: flex;
            gap: 16px;
            align-items: flex-start;
        }

        .full-width {
            width: 100%;
        }

        .half-width {
            flex: 1;
        }

        .section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 18px;
            font-weight: 500;
            margin: 24px 0 16px 0;
            color: #1976d2;
        }

        .subsection-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 500;
            margin: 20px 0 12px 0;
            color: #424242;
            border-left: 3px solid #1976d2;
            padding-left: 12px;
        }

        .payment-config-section {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
            border: 1px solid #e9ecef;
        }

        .payment-section-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            margin: 0 0 16px 0;
            color: #1976d2;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 8px;
        }

        .payment-config-section .mat-form-field {
            margin-bottom: 16px;
        }

        .payment-config-section .mat-form-field:last-child {
            margin-bottom: 0;
        }

        .form-row .mat-checkbox {
            margin-right: 24px;
        }

        .form-row .mat-checkbox:last-child {
            margin-right: 0;
        }

        .type-description {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background-color: #e3f2fd;
            border-radius: 8px;
            color: #1565c0;
            font-size: 14px;
        }

        .file-upload-section {
            margin-top: 16px;
        }

        .upload-description {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background-color: #f5f5f5;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
        }

        .file-upload-container {
            margin-top: 16px;
        }

        .upload-area {
            border: 2px dashed #ddd;
            border-radius: 12px;
            padding: 40px 20px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            background-color: #fafafa;
        }

        .upload-area:hover, .upload-area.dragover {
            border-color: #1976d2;
            background-color: #e3f2fd;
        }

        .upload-icon {
            font-size: 48px;
            height: 48px;
            width: 48px;
            color: #bbb;
            margin-bottom: 16px;
        }

        .upload-text {
            font-size: 16px;
            color: #666;
            margin-bottom: 8px;
        }

        .upload-hint {
            font-size: 14px;
            color: #999;
        }

        .selected-file {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background-color: #e8f5e8;
            border-radius: 8px;
            margin-top: 16px;
        }

        .file-name {
            font-weight: 500;
            color: #2e7d32;
        }

        .file-size {
            color: #666;
            font-size: 14px;
        }

        .upload-progress {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .dialog-actions {
            padding: 16px 24px;
            gap: 12px;
        }

        mat-dialog-title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 24px;
            font-weight: 500;
            padding: 24px 24px 0 24px;
        }

        mat-option {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        mat-progress-spinner {
            display: inline-block;
            vertical-align: middle;
            margin-left: 12px;
        }

        @media (max-width: 768px) {
            .supplier-dialog {
                min-width: 100vw;
                max-width: 100vw;
                height: 100vh;
            }

            .form-row {
                flex-direction: column;
            }

            .tab-content {
                padding: 16px;
            }

            .upload-area {
                padding: 20px 10px;
            }
        }
    `]
})
export class CreateSupplierDialogComponent {
    supplierForm: FormGroup;
    loadingOps = false;
    saving = false;
    soapOperations: string[] = [];
    selectedTabIndex = 0;
    
    // File upload properties
    selectedFile: File | null = null;
    isDragOver = false;
    uploadProgress = 0;
    
    // SOAP operations for payment system
    paymentSoapOperations: string[] = [];

    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<CreateSupplierDialogComponent>);
    private supplierService = inject(SupplierService);
    private http = inject(HttpClient);
 private snackBar = inject(MatSnackBar);

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.supplierForm = this.fb.group({
            // Basic Information
            name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
            email: [data?.contactEmail || '', [Validators.email]],
            type: [data?.type || 'API', Validators.required],
            
            // API Configuration
            url: [data?.url || ''],
            apiKey: [data?.apiKey || ''],
            authMethod: [data?.authMethod || ''],
            dataFormat: [data?.dataFormat || ''],
            productsEndpoint: [data?.productsEndpoint || ''],
            singleEndpoint: [data?.singleEndpoint || ''],
            
            // File Configuration
            fileName: [data?.fileName || ''],
            filePath: [data?.filePath || ''],
            
            // SOAP Configuration
            wsdlUrl: [data?.wsdlUrl || ''],
            namespace: [data?.namespace || ''],
            username: [data?.username || ''],
            password: [data?.password || ''],
            operation: [data?.operation || ''],
            
            // SOAP Operation Configuration
            paymentOperationName: [data?.paymentOperationName || ''],
            refundOperationName: [data?.refundOperationName || ''],
            successOperationName: [data?.successOperationName || 'notifyPaymentStatus'],
            
            // Payment System Configuration
            hasOwnPaymentSystem: [data?.hasOwnPaymentSystem || false],
            autoPaymentEnabled: [data?.autoPaymentEnabled !== false],
            paymentIntegrationType: [data?.paymentIntegrationType || 'MANUAL'],
            
            // SOAP Payment Configuration
            paymentWsdlUrl: [data?.paymentWsdlUrl || ''],
            paymentOperationNameConfig: [data?.paymentOperationNameConfig || ''],
            soapAction: [data?.soapAction || 'http://tempuri.org/ProcessPayment'],
            
            // API Payment Configuration
            paymentApiEndpoint: [data?.paymentApiEndpoint || ''],
            commissionApiEndpoint: [data?.commissionApiEndpoint || ''],
            
            // Payment Schedule Configuration
            payoutFrequency: [data?.payoutFrequency || 'WEEKLY'],
            customPaymentSchedule: [data?.customPaymentSchedule || ''],
            customPaymentDays: [data?.customPaymentDays || ''],
            customPaymentHour: [data?.customPaymentHour || 18],
            minimumPaymentAmount: [data?.minimumPaymentAmount || 50],
            maximumPaymentDelay: [data?.maximumPaymentDelay || 30]
        });
        
        // Update validators based on initial type
        this.updateValidators();
        this.setupPaymentSystemListener();
        
        // Initialize payment SOAP operations if editing
        if (data?.paymentWsdlUrl) {
            this.loadPaymentSoapOperations();
        }
    }

    onTypeChange(): void {
        console.log('Type changed to:', this.supplierForm.get('type')?.value);
        
        // Clear type-specific fields
        this.supplierForm.patchValue({ 
            url: '', 
            apiKey: '', 
            authMethod: '',
            productsEndpoint: '/products',
            singleEndpoint: '/product/{id}',
            dataFormat: 'JSON',
            wsdlUrl: '', 
            namespace: '',
            username: '',
            password: '',
            operation: '',
            paymentOperationName: '',
            refundOperationName: '',
            successOperationName: '',
            // Clear payment-specific fields
            paymentWsdlUrl: '',
            paymentOperationNameConfig: '',
            soapAction: 'http://tempuri.org/ProcessPayment',
            paymentApiEndpoint: '',
            commissionApiEndpoint: '',
            // Reset payment system settings
            hasOwnPaymentSystem: false,
            autoPaymentEnabled: true,
            paymentIntegrationType: 'MANUAL'
        });
        
        this.soapOperations = [];
        this.paymentSoapOperations = [];
        this.selectedFile = null;
        
        // Update validators after clearing fields
        this.updateValidators();
        this.updatePaymentValidators();
        
        console.log('Validators updated. Form valid:', this.supplierForm.valid);
    }

    updateValidators(): void {
        const type = this.supplierForm.get('type')?.value;
        const hasOwnPayment = this.supplierForm.get('hasOwnPaymentSystem')?.value;
        const urlControl = this.supplierForm.get('url');
        const wsdlUrlControl = this.supplierForm.get('wsdlUrl');
        const namespaceControl = this.supplierForm.get('namespace');
        const operationControl = this.supplierForm.get('operation');

        console.log('updateValidators called - Type:', type, 'HasOwnPayment:', hasOwnPayment);

        // Clear all validators first
        urlControl?.clearValidators();
        wsdlUrlControl?.clearValidators();
        namespaceControl?.clearValidators();
        operationControl?.clearValidators();

        // Set validators based on type
        if (type === 'API') {
            urlControl?.setValidators([Validators.required]);
            console.log('API type: URL field is now required');
        } else if (type === 'SOAP') {
            // For SOAP, URL field is NOT required (only WSDL URL might be)
            urlControl?.clearValidators(); // Remove any required validators
            console.log('SOAP type: URL field is NOT required');
            
            // For SOAP, WSDL URL is only required if they have their own payment system
            // Otherwise, it's optional since we handle payments through our platform
            if (hasOwnPayment) {
                wsdlUrlControl?.setValidators([Validators.required]);
                console.log('SOAP type with own payment: WSDL URL is now required');
            } else {
                console.log('SOAP type without own payment: WSDL URL is optional');
            }
            // Namespace is optional; operation optional and auto-fetched
        }

        // Update validity
        urlControl?.updateValueAndValidity();
        wsdlUrlControl?.updateValueAndValidity();
        namespaceControl?.updateValueAndValidity();
        operationControl?.updateValueAndValidity();
        
        console.log('Validators updated. Form valid:', this.supplierForm.valid);
        console.log('URL field validators:', urlControl?.hasValidator(Validators.required));
        console.log('WSDL URL field validators:', wsdlUrlControl?.hasValidator(Validators.required));
    }

    setupPaymentSystemListener(): void {
        // Listen for changes in hasOwnPaymentSystem to update validators
        this.supplierForm.get('hasOwnPaymentSystem')?.valueChanges.subscribe(hasOwnPayment => {
            this.updatePaymentValidators();
        });
        
        // Listen for type changes to update payment integration type
        this.supplierForm.get('type')?.valueChanges.subscribe(type => {
            if (type === 'SOAP') {
                this.supplierForm.patchValue({ paymentIntegrationType: 'SOAP' });
            } else if (type === 'API') {
                this.supplierForm.patchValue({ paymentIntegrationType: 'REST_API' });
            } else {
                this.supplierForm.patchValue({ paymentIntegrationType: 'MANUAL' });
            }
        });
    }

    updatePaymentValidators(): void {
        const hasOwnPayment = this.supplierForm.get('hasOwnPaymentSystem')?.value;
        const type = this.supplierForm.get('type')?.value;
        
        // Get payment-related controls
        const paymentWsdlUrlControl = this.supplierForm.get('paymentWsdlUrl');
        const paymentOperationNameConfigControl = this.supplierForm.get('paymentOperationNameConfig');
        const soapActionControl = this.supplierForm.get('soapAction');
        const paymentApiEndpointControl = this.supplierForm.get('paymentApiEndpoint');
        const commissionApiEndpointControl = this.supplierForm.get('commissionApiEndpoint');
        
        // Clear all payment validators first
        paymentWsdlUrlControl?.clearValidators();
        paymentOperationNameConfigControl?.clearValidators();
        soapActionControl?.clearValidators();
        paymentApiEndpointControl?.clearValidators();
        commissionApiEndpointControl?.clearValidators();
        
        if (hasOwnPayment) {
            if (type === 'SOAP') {
                // SOAP supplier with own payment system
                paymentWsdlUrlControl?.setValidators([Validators.required]);
                paymentOperationNameConfigControl?.setValidators([Validators.required]);
                soapActionControl?.setValidators([Validators.required]);
            } else if (type === 'API') {
                // API supplier with own payment system
                paymentApiEndpointControl?.setValidators([Validators.required]);
                commissionApiEndpointControl?.setValidators([Validators.required]);
            }
        }
        
        // Update validity
        paymentWsdlUrlControl?.updateValueAndValidity();
        paymentOperationNameConfigControl?.updateValueAndValidity();
        soapActionControl?.updateValueAndValidity();
        paymentApiEndpointControl?.updateValueAndValidity();
        commissionApiEndpointControl?.updateValueAndValidity();
        
        // Also update main validators since hasOwnPayment affects WSDL URL requirement
        this.updateValidators();
    }

    getTypeDescription(): string {
        const type = this.supplierForm.get('type')?.value;
        switch (type) {
            case 'API':
                return 'Connect to supplier via REST API endpoints for real-time product synchronization.';
            case 'SOAP':
                return 'Integrate with supplier SOAP web services for structured data exchange.';
            case 'EXCEL':
                return 'Upload Excel files containing product data for batch import.';
            case 'CSV':
                return 'Upload CSV files with product information for bulk processing.';
            default:
                return '';
        }
    }

    onTabChange(event: any): void {
        this.selectedTabIndex = event.index;
    }

    // File upload methods
    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = false;
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.handleFileSelection(files[0]);
        }
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.handleFileSelection(file);
        }
    }

    handleFileSelection(file: File): void {
        const type = this.supplierForm.get('type')?.value;
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        // Validate file size
        if (file.size > maxSize) {
            this.snackBar.open('File size must be less than 10MB', 'Close', { duration: 3000 });
            return;
        }

        // Validate file type
        const validExtensions = type === 'EXCEL' 
            ? ['.xlsx', '.xls'] 
            : ['.csv'];
        
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            this.snackBar.open(
                `Invalid file type. Please select a ${validExtensions.join(' or ')} file.`, 
                'Close', 
                { duration: 3000 }
            );
            return;
        }

        this.selectedFile = file;
    }

    removeFile(): void {
        this.selectedFile = null;
        this.uploadProgress = 0;
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    loadSoapOperations(): void {
        const wsdlUrl = this.supplierForm.get('wsdlUrl')?.value;
        if (!wsdlUrl) {
            this.soapOperations = [];
            return;
        }
        
        console.log('Loading SOAP operations from:', wsdlUrl);
        this.loadingOps = true;
        
        // Use backend proxy to avoid CORS and do robust parsing
        this.supplierService.getWsdlOperations(wsdlUrl).subscribe({
            next: (ops) => {
                // Filter out error sentinel
                this.soapOperations = (ops || []).filter(op => !String(op).startsWith('ERROR:'));
                console.log('Loaded SOAP operations:', this.soapOperations);
                this.loadingOps = false;
            },
            error: (error) => {
                console.error('Error loading SOAP operations:', error);
                this.soapOperations = [];
                this.loadingOps = false;
                this.snackBar.open('Failed to load SOAP operations. Please check the WSDL URL.', 'Close', { duration: 3000 });
            }
        });
    }

    loadPaymentSoapOperations(): void {
        const paymentWsdlUrl = this.supplierForm.get('paymentWsdlUrl')?.value;
        if (!paymentWsdlUrl) {
            this.paymentSoapOperations = [];
            return;
        }
        
        console.log('Loading payment SOAP operations from:', paymentWsdlUrl);
        
        this.supplierService.getWsdlOperations(paymentWsdlUrl).subscribe({
            next: (ops) => {
                // Filter out error sentinel
                this.paymentSoapOperations = (ops || []).filter(op => !String(op).startsWith('ERROR:'));
                console.log('Loaded payment SOAP operations:', this.paymentSoapOperations);
            },
            error: (error) => {
                console.error('Error loading payment SOAP operations:', error);
                this.paymentSoapOperations = [];
                this.snackBar.open('Failed to load payment SOAP operations. Please check the payment WSDL URL.', 'Close', { duration: 3000 });
            }
        });
    }

    onSave(): void {
        console.log('Form validity:', this.supplierForm.valid);
        console.log('Form errors:', this.supplierForm.errors);
        console.log('Form value:', this.supplierForm.value);
        
        // Debug each form control validity
        Object.keys(this.supplierForm.controls).forEach(key => {
            const control = this.supplierForm.get(key);
            if (control && !control.valid) {
                console.log(`Field ${key} is invalid:`, control.errors, 'Value:', control.value);
            }
        });
        
        if (this.supplierForm.valid) {
            this.saving = true;
            
            // Validate payment configuration
            const paymentValidation = this.validatePaymentConfiguration();
            if (!paymentValidation.isValid) {
                this.snackBar.open(paymentValidation.message, 'Close', { duration: 5000 });
                this.saving = false;
                return;
            }
            
            const formData = this.supplierForm.value;
            
            // Prepare supplier data
            const supplierData = {
                name: formData.name,
                contactEmail: formData.email,
                active: true,
                type: formData.type,
                
                // API Configuration
                apiUrl: formData.url, // Use url field for apiUrl
                apiKey: formData.apiKey,
                authMethod: formData.authMethod,
                dataFormat: formData.dataFormat,
                productsEndpoint: formData.productsEndpoint,
                singleEndpoint: formData.singleEndpoint,
                
                // File Configuration
                fileName: formData.fileName,
                filePath: formData.filePath,
                
                // SOAP Configuration
                wsdlUrl: formData.wsdlUrl,
                namespace: formData.namespace,
                username: formData.username,
                password: formData.password,
                operation: formData.operation,
                
                // SOAP Operation Configuration
                paymentOperationName: formData.paymentOperationName,
                refundOperationName: formData.refundOperationName,
                successOperationName: formData.successOperationName,
                
                // Payment System Configuration
                hasOwnPaymentSystem: formData.hasOwnPaymentSystem,
                autoPaymentEnabled: formData.autoPaymentEnabled,
                paymentIntegrationType: formData.paymentIntegrationType,
                
                // SOAP Payment Configuration
                paymentWsdlUrl: formData.paymentWsdlUrl,
                paymentOperationNameConfig: formData.paymentOperationNameConfig,
                soapAction: formData.soapAction,
                
                // API Payment Configuration
                paymentApiEndpoint: formData.paymentApiEndpoint,
                commissionApiEndpoint: formData.commissionApiEndpoint,
                
                // Payment Schedule Configuration
                payoutFrequency: formData.payoutFrequency,
                customPaymentSchedule: formData.customPaymentSchedule,
                customPaymentDays: formData.customPaymentDays,
                customPaymentHour: formData.customPaymentHour,
                minimumPaymentAmount: formData.minimumPaymentAmount,
                maximumPaymentDelay: formData.maximumPaymentDelay
            };
            
            if (this.data) {
                // Update existing supplier
                this.supplierService.updateSupplier(this.data.id, supplierData).subscribe({
                    next: (response) => {
                        this.snackBar.open('Supplier updated successfully!', 'Close', { duration: 3000 });
                        this.dialogRef.close(response);
                    },
                    error: (error) => {
                        console.error('Error updating supplier:', error);
                        this.snackBar.open('Error updating supplier: ' + (error.error?.message || error.message), 'Close', { duration: 5000 });
                        this.saving = false;
                    }
                });
            } else {
                // Create new supplier
                this.supplierService.createSupplier(supplierData).subscribe({
                    next: (response) => {
                        this.snackBar.open('Supplier created successfully!', 'Close', { duration: 3000 });
                        this.dialogRef.close(response);
                    },
                    error: (error) => {
                        console.error('Error creating supplier:', error);
                        this.snackBar.open('Error creating supplier: ' + (error.error?.message || error.message), 'Close', { duration: 5000 });
                        this.saving = false;
                    }
                });
            }
        } else {
            this.markFormGroupTouched();
            this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
        }
    }

    validatePaymentConfiguration(): { isValid: boolean; message: string } {
        const formData = this.supplierForm.value;
        const hasOwnPayment = formData.hasOwnPaymentSystem;
        const type = formData.type;
        
        if (!hasOwnPayment) {
            return { isValid: true, message: '' }; // No payment system required
        }
        
        if (type === 'SOAP') {
            if (!formData.paymentWsdlUrl) {
                return { isValid: false, message: 'Payment WSDL URL is required for SOAP suppliers with own payment system.' };
            }
            if (!formData.paymentOperationNameConfig) {
                return { isValid: false, message: 'Payment operation name is required for SOAP suppliers with own payment system.' };
            }
            if (!formData.soapAction) {
                return { isValid: false, message: 'SOAP action is required for SOAP suppliers with own payment system.' };
            }
        } else if (type === 'API') {
            if (!formData.paymentApiEndpoint) {
                return { isValid: false, message: 'Payment API endpoint is required for API suppliers with own payment system.' };
            }
            if (!formData.commissionApiEndpoint) {
                return { isValid: false, message: 'Commission API endpoint is required for API suppliers with own payment system.' };
            }
        }
        
        return { isValid: true, message: '' };
    }

    markFormGroupTouched(): void {
        Object.keys(this.supplierForm.controls).forEach(key => {
            const control = this.supplierForm.get(key);
            control?.markAsTouched();
        });
    }

    private cleanSupplierData(supplier: any): any {
        const cleaned: any = {
            name: supplier.name,
            contactEmail: supplier.email || undefined,
            type: supplier.type
        };

        switch (supplier.type) {
            case 'API':
                cleaned.apiUrl = supplier.apiUrl || supplier.url;
                cleaned.productsEndpoint = supplier.productsEndpoint;
                cleaned.singleEndpoint = supplier.singleEndpoint;
                cleaned.dataFormat = supplier.dataFormat;
                if (supplier.apiKey) cleaned.apiKey = supplier.apiKey;
                if (supplier.authMethod) cleaned.authMethod = supplier.authMethod;
                break;
            case 'SOAP':
                cleaned.wsdlUrl = supplier.wsdlUrl;
                cleaned.namespace = supplier.namespace;
                if (supplier.operation) cleaned.operation = supplier.operation; // Optional
                if (supplier.username) cleaned.username = supplier.username;
                if (supplier.password) cleaned.password = supplier.password;
                if (supplier.paymentOperationName) cleaned.paymentOperationName = supplier.paymentOperationName;
                if (supplier.refundOperationName) cleaned.refundOperationName = supplier.refundOperationName;
                if (supplier.successOperationName) cleaned.successOperationName = supplier.successOperationName;
                
                // New payment system configuration fields
                cleaned.paymentIntegrationType = 'SOAP'; // Always SOAP for SOAP suppliers
                cleaned.autoPaymentEnabled = supplier.autoPaymentEnabled !== false; // Default to true
                if (supplier.paymentWsdlUrl) cleaned.paymentWsdlUrl = supplier.paymentWsdlUrl;
                if (supplier.paymentOperationNameConfig) cleaned.paymentOperationNameConfig = supplier.paymentOperationNameConfig;
                if (supplier.soapAction) cleaned.soapAction = supplier.soapAction;
                break;
            case 'EXCEL':
            case 'CSV':
                if (supplier.url) cleaned.url = supplier.url;
                break;
        }

        // Append payment configuration (applies to all types)
        cleaned.hasOwnPaymentSystem = !!supplier.hasOwnPaymentSystem;
        if (supplier.paymentApiEndpoint) cleaned.paymentApiEndpoint = supplier.paymentApiEndpoint;
        if (supplier.commissionApiEndpoint) cleaned.commissionApiEndpoint = supplier.commissionApiEndpoint;
        if (supplier.payoutFrequency) cleaned.payoutFrequency = supplier.payoutFrequency;
        if (supplier.customPaymentSchedule) cleaned.customPaymentSchedule = supplier.customPaymentSchedule;
        if (supplier.customPaymentDays) cleaned.customPaymentDays = supplier.customPaymentDays;
        if (supplier.customPaymentHour !== undefined) cleaned.customPaymentHour = supplier.customPaymentHour;
        if (supplier.minimumPaymentAmount !== undefined) cleaned.minimumPaymentAmount = supplier.minimumPaymentAmount;
        if (supplier.maximumPaymentDelay !== undefined) cleaned.maximumPaymentDelay = supplier.maximumPaymentDelay;

        return cleaned;
    }

    private handleFileUpload(supplierId: number): void {
        if (this.selectedFile && (this.supplierForm.get('type')?.value === 'EXCEL' || this.supplierForm.get('type')?.value === 'CSV')) {
            this.uploadProgress = 0;
            
            this.supplierService.uploadExcel(this.selectedFile, supplierId).subscribe({
                next: (response) => {
                    this.uploadProgress = 100;
                    this.snackBar.open('File uploaded and processed successfully!', 'Close', { duration: 3000 });
                    this.dialogRef.close(true);
                    this.saving = false;
                },
                error: (error) => {
                    console.error('Error uploading file:', error);
                    this.snackBar.open('Supplier created but file upload failed.', 'Close', { duration: 3000 });
                    this.dialogRef.close(true);
                    this.saving = false;
                }
            });
        } else {
            this.dialogRef.close(true);
            this.saving = false;
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
