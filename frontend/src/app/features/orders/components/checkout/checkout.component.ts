import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { AddressService } from '../../../../core/services/address.service';
import { Address } from '../../../../core/models/address.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { StripePaymentFormComponent } from './stripe-payment-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    StripePaymentFormComponent
  ]
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private addressService = inject(AddressService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  // Cart properties
  cart: any = null;
  cartTotal = 0;
  cartItems: any[] = [];
  isLoading = false;

  // Address properties
  addresses: Address[] = [];
  selectedAddressId: number | null = null;
  useNewAddress = false;
  addressForm!: FormGroup;
  
  // Shipping properties
  shippingFee = 0;
  totalWithShipping = 0;
  
  // Countries and cities data
  countries: Array<{ code: string; name: string; shippingFee: number; currency: string }> = [];
  moroccoCities: Array<{ name: string; shippingFee: number; region: string }> = [];
  selectedCity = '';
  selectedRegion = '';
  
  // Payment form properties
  showPaymentForm = false;
  currentPaymentData: any = null;

  ngOnInit(): void {
    console.log('🚀 Checkout component initializing...');
    this.initializeAddressForm();
    this.loadCountriesData();
    this.loadInitialData();
    this.setupFormSubscriptions();
    
    // Add timeout fallback to prevent infinite loading
    setTimeout(() => {
      if (this.isLoading) {
        console.log('⏰ Loading timeout reached, forcing loading to false');
        this.isLoading = false;
        this.snackBar.open('Erreur de chargement. Veuillez rafraîchir la page.', 'Fermer', { duration: 5000 });
      }
    }, 10000); // 10 second timeout
    
    console.log('✅ Checkout component initialization completed');
  }

  // Manual method to reset loading state
  resetLoading(): void {
    console.log('🔄 Manually resetting loading state');
    this.isLoading = false;
  }

  // Manual retry method
  retryLoading(): void {
    console.log('🔄 Manual retry requested');
    this.loadInitialData();
  }

  // Debug method to check component state
  debugState(): void {
    console.log('🔍 Current checkout component state:');
    console.log('- isLoading:', this.isLoading);
    console.log('- cart:', this.cart);
    console.log('- cartItems:', this.cartItems);
    console.log('- addresses:', this.addresses);
    console.log('- selectedAddressId:', this.selectedAddressId);
    console.log('- useNewAddress:', this.useNewAddress);
    console.log('- addressForm valid:', this.addressForm.valid);
    console.log('- addressForm value:', this.addressForm.value);
    console.log('- shippingFee:', this.shippingFee);
    console.log('- total:', this.totalWithShipping);
  }

  // Prepare order data for submission
  private prepareOrderData(): any {
    if (this.useNewAddress) {
      // For new addresses, include the full address data
      const formValue = this.addressForm.value;
      return {
        useNewAddress: true,
        newAddress: {
          fullName: formValue.fullName,
          address: formValue.address,
          city: formValue.city,
          state: formValue.state,
          postalCode: formValue.postalCode,
          country: formValue.country,
          phone: formValue.phone
        },
        shippingFee: this.shippingFee
      };
    } else {
      // For existing addresses, send just the ID and shipping fee
      // BUT include useNewAddress: false as the backend requires it
      return {
        useNewAddress: false,
        addressId: this.selectedAddressId,
        shippingFee: this.shippingFee
      };
    }
  }

  private initializeAddressForm(): void {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],  // Added state field
      postalCode: ['', Validators.required],
      country: ['MA', Validators.required],  // Default to Morocco
      phone: ['', Validators.required]
    });
  }

  private loadCountriesData(): void {
    this.countries = [
      { code: 'MA', name: '🇲🇦 Maroc', shippingFee: 25.0, currency: 'MAD' },
      { code: 'FR', name: '🇫🇷 France', shippingFee: 5.99, currency: 'EUR' },
      { code: 'BE', name: '🇧🇪 Belgique', shippingFee: 6.99, currency: 'EUR' },
      { code: 'DE', name: '🇩🇪 Allemagne', shippingFee: 7.99, currency: 'EUR' },
      { code: 'ES', name: '🇪🇸 Espagne', shippingFee: 6.49, currency: 'EUR' },
      { code: 'IT', name: '🇮🇹 Italie', shippingFee: 7.49, currency: 'EUR' }
    ];

    this.moroccoCities = [
      { name: 'Casablanca', shippingFee: 15.0, region: 'Casablanca-Settat' },
      { name: 'Rabat', shippingFee: 18.0, region: 'Rabat-Salé-Kénitra' },
      { name: 'Fès', shippingFee: 20.0, region: 'Fès-Meknès' },
      { name: 'Marrakech', shippingFee: 22.0, region: 'Marrakech-Safi' },
      { name: 'Agadir', shippingFee: 25.0, region: 'Souss-Massa' },
      { name: 'Tanger', shippingFee: 18.0, region: 'Tanger-Tétouan-Al Hoceïma' },
      { name: 'Meknès', shippingFee: 20.0, region: 'Fès-Meknès' },
      { name: 'Oujda', shippingFee: 23.0, region: 'Oriental' },
      { name: 'Kénitra', shippingFee: 17.0, region: 'Rabat-Salé-Kénitra' },
      { name: 'Tétouan', shippingFee: 19.0, region: 'Tanger-Tétouan-Al Hoceïma' },
      { name: 'Safi', shippingFee: 21.0, region: 'Marrakech-Safi' },
      { name: 'El Jadida', shippingFee: 20.0, region: 'Casablanca-Settat' },
      { name: 'Béni Mellal', shippingFee: 22.0, region: 'Béni Mellal-Khénifra' },
      { name: 'Nador', shippingFee: 24.0, region: 'Oriental' },
      { name: 'Taza', shippingFee: 21.0, region: 'Fès-Meknès' },
      { name: 'Settat', shippingFee: 19.0, region: 'Casablanca-Settat' },
      { name: 'Larache', shippingFee: 20.0, region: 'Tanger-Tétouan-Al Hoceïma' },
      { name: 'Khouribga', shippingFee: 21.0, region: 'Béni Mellal-Khénifra' },
      { name: 'Berkane', shippingFee: 23.0, region: 'Oriental' },
      { name: 'Taourirt', shippingFee: 24.0, region: 'Oriental' }
    ];
  }

  private loadInitialData(): void {
    console.log('🔄 Starting to load initial data...');
    this.isLoading = true;
    
    // Use Promise.all to wait for both operations to complete
    Promise.all([
      this.loadCart(),
      this.loadAddresses()
    ]).then(() => {
      console.log('✅ All initial data loaded successfully');
      this.isLoading = false;
      
      // Set default country and update shipping fee after everything is loaded
      const defaultCountry = this.countries.find(c => c.code === 'MA') || this.countries[0];
      this.addressForm.patchValue({ country: defaultCountry.code });
      this.updateShippingFee(defaultCountry.code);
    }).catch((error) => {
      console.error('❌ Error loading initial data:', error);
      this.isLoading = false;
      this.snackBar.open('Erreur de chargement des données', 'Fermer', { duration: 5000 });
    });
  }

  private loadCart(): Promise<void> {
    console.log('🛒 Loading cart...');
    return new Promise((resolve, reject) => {
      this.cartService.getCart().subscribe({
        next: (cart) => {
          console.log('✅ Cart loaded:', cart);
          this.cart = cart;
          this.cartItems = cart?.items || [];
          this.cartTotal = cart?.total || 0;
          this.calculateTotal();
          resolve();
        },
        error: (error) => {
          console.error('❌ Error loading cart:', error);
          reject(error);
        }
      });
    });
  }

  private loadAddresses(): Promise<void> {
    console.log('🏠 Loading addresses...');
    return new Promise((resolve, reject) => {
      this.addressService.getAddresses().subscribe({
        next: (addresses) => {
          console.log('✅ Addresses loaded:', addresses);
          this.addresses = addresses || [];
          // Set default address if available
          const defaultAddress = this.addresses.find(addr => addr.isDefault);
          if (defaultAddress) {
            this.selectedAddressId = defaultAddress.id;
            this.useNewAddress = false;
            console.log('⭐ Default address selected:', defaultAddress.id);
          } else if (this.addresses.length === 0) {
            // If no addresses exist, automatically enable new address form
            this.useNewAddress = true;
            this.selectedAddressId = null;
            console.log('📝 No addresses found, enabling new address form');
          }
          resolve();
        },
        error: (error) => {
          console.error('❌ Error loading addresses:', error);
          // If error loading addresses, enable new address form
          this.useNewAddress = true;
          this.selectedAddressId = null;
          reject(error);
        }
      });
    });
  }

  private setupFormSubscriptions(): void {
    // Watch for country changes
    this.addressForm.get('country')?.valueChanges.subscribe(country => {
      this.updateShippingFee(country);
      this.updateCityOptions(country);
    });

    // Watch for city changes (Morocco specific)
    this.addressForm.get('city')?.valueChanges.subscribe(city => {
      this.updateCityShippingFee(city);
    });
  }

  private updateShippingFee(country: string): void {
    const countryData = this.countries.find(c => c.code === country);
    if (countryData) {
      this.shippingFee = countryData.shippingFee;
      this.calculateTotal();
    }
  }

  // Get available cities based on selected country
  getAvailableCities(): any[] {
    const country = this.addressForm.get('country')?.value;
    if (country === 'MA') {
      return this.moroccoCities;
    } else {
      // For other countries, return empty array (free text input)
      return [];
    }
  }

  // Handle city selection change
  onCityChange(cityName: string): void {
    console.log('🏙️ City selected:', cityName);
    
    if (cityName) {
      const cityData = this.moroccoCities.find(c => c.name === cityName);
      if (cityData) {
        // Update state field automatically
        this.addressForm.patchValue({ state: cityData.region });
        
        // Update shipping fee
        this.shippingFee = cityData.shippingFee;
        this.calculateTotal();
        
        console.log('✅ City updated: {} - {} - Shipping fee: {}', cityName, cityData.region, cityData.shippingFee);
      }
    }
  }

  // Update city options when country changes
  private updateCityOptions(country: string): void {
    if (country === 'MA') {
      // Enable city field for Morocco
      this.addressForm.get('city')?.enable();
      this.addressForm.get('state')?.enable();
      
      // Clear previous city selection
      this.addressForm.patchValue({ city: '', state: '' });
      this.shippingFee = 0;
      this.calculateTotal();
    } else {
      // For other countries, disable city dropdown and enable free text
      this.addressForm.get('city')?.disable();
      this.addressForm.get('state')?.disable();
      
      // Clear city data
      this.addressForm.patchValue({ city: '', state: '' });
      
      // Use country default shipping fee
      const countryData = this.countries.find(c => c.code === country);
      this.shippingFee = countryData?.shippingFee || 0;
      this.calculateTotal();
    }
  }

  private updateCityShippingFee(city: string): void {
    const country = this.addressForm.get('country')?.value;
    
    if (city && country) {
      if (country === 'MA') {
        // Morocco-specific city shipping calculation
        const cityData = this.moroccoCities.find(c => c.name === city);
        if (cityData) {
          // Convert MAD shipping fee to EUR (1 EUR ≈ 11 MAD)
          this.shippingFee = cityData.shippingFee / 11;
          this.selectedCity = cityData.name;
          this.selectedRegion = cityData.region;
          console.log('✅ City shipping fee updated:', cityData.name, cityData.shippingFee, 'MAD =', this.shippingFee, 'EUR');
          this.calculateTotal();
        }
      } else {
        // For other countries, city might affect shipping but we use country default
        // You can extend this logic for other countries as needed
        this.selectedCity = city;
        this.calculateTotal();
      }
    }
  }

  private calculateTotal(): void {
    console.log('🧮 Calculating total...');
    console.log('- cartTotal:', this.cartTotal);
    console.log('- shippingFee:', this.shippingFee);
    this.totalWithShipping = this.cartTotal + this.shippingFee;
    console.log('- totalWithShipping:', this.totalWithShipping);
  }

  // Address selection methods
  selectSavedAddress(addressId: number): void {
    console.log('🏠 Selecting saved address:', addressId);
    this.selectedAddressId = addressId;
    this.useNewAddress = false;
    
    // Find the selected address to get its details
    const selectedAddress = this.addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      console.log('✅ Selected address details:', selectedAddress);
      
      // Calculate shipping fee based on the selected address
      this.updateShippingFeeForAddress(selectedAddress);
      
      // Update form with address details for reference
      this.addressForm.patchValue({
        country: selectedAddress.country,
        city: selectedAddress.city,
        state: selectedAddress.state
      });
    }
    
    this.calculateTotal();
  }

  // Update shipping fee based on address
  private updateShippingFeeForAddress(address: any): void {
    console.log('💰 Updating shipping fee for address:', address);
    
    if (address.country === 'MA') {
      // Morocco-specific shipping calculation
      if (address.city) {
        const cityData = this.moroccoCities.find(c => c.name === address.city);
        if (cityData) {
          // Convert MAD shipping fee to EUR (1 EUR ≈ 11 MAD)
          this.shippingFee = cityData.shippingFee / 11;
          console.log('✅ Morocco city shipping fee set:', cityData.name, cityData.shippingFee, 'MAD =', this.shippingFee, 'EUR');
        } else {
          // Use default Morocco shipping fee
          this.shippingFee = 25 / 11; // Convert 25 MAD to EUR
          console.log('⚠️ City not found, using default Morocco shipping fee:', 25, 'MAD =', this.shippingFee, 'EUR');
        }
      } else {
        // Use default Morocco shipping fee
        this.shippingFee = 25 / 11; // Convert 25 MAD to EUR
        console.log('⚠️ No city, using default Morocco shipping fee:', 25, 'MAD =', this.shippingFee, 'EUR');
      }
    } else {
      // Other countries - use country default
      const countryData = this.countries.find(c => c.code === address.country);
      if (countryData?.currency === 'MAD') {
        // Convert MAD to EUR
        this.shippingFee = (countryData.shippingFee || 0) / 11;
        console.log('✅ Other country shipping fee set:', address.country, countryData.shippingFee, 'MAD =', this.shippingFee, 'EUR');
      } else {
        // Already in EUR
        this.shippingFee = countryData?.shippingFee || 0;
        console.log('✅ Other country shipping fee set:', address.country, this.shippingFee, 'EUR');
      }
    }
    
    console.log('💰 Final shipping fee in EUR:', this.shippingFee);
  }

  useNewAddressForm(): void {
    this.useNewAddress = true;
    this.selectedAddressId = null;
    this.clearAddressForm();
  }

  private clearAddressForm(): void {
    this.addressForm.reset({
      country: 'MA',
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      phone: ''
    });
  }

  // Checkout methods
  proceedToPayment(): void {
    if (this.isLoading) {
      console.log('⚠️ Payment already in progress, ignoring request');
      return;
    }

    console.log('💳 Proceeding to payment with smart routing...');
    this.isLoading = true;

    // Add timeout to prevent infinite loading
    const paymentTimeout = setTimeout(() => {
      if (this.isLoading) {
        console.log('⏰ Payment timeout reached, resetting loading state');
        this.isLoading = false;
        this.snackBar.open('Délai d\'attente dépassé. Veuillez réessayer.', 'Fermer', { duration: 5000 });
      }
    }, 30000); // 30 second timeout

    // Validate form
    if (this.useNewAddress) {
      this.addressForm.markAllAsTouched();
      if (!this.addressForm.valid) {
        console.log('❌ New address form is invalid');
        clearTimeout(paymentTimeout);
        this.isLoading = false;
        this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'Fermer', { duration: 3000 });
        return;
      }
    } else if (!this.selectedAddressId) {
      console.log('❌ No address selected');
      clearTimeout(paymentTimeout);
      this.isLoading = false;
      this.snackBar.open('Veuillez sélectionner une adresse de livraison', 'Fermer', { duration: 3000 });
      return;
    }

    // Create order with smart payment routing
    const orderData = this.prepareOrderData();
    console.log('📦 Order data prepared:', orderData);
    console.log('🔍 Detailed order data:', {
      useNewAddress: this.useNewAddress,
      addressId: orderData.addressId,
      shippingFee: orderData.shippingFee,
      addressIdType: typeof orderData.addressId,
      shippingFeeType: typeof orderData.shippingFee,
      selectedAddressId: this.selectedAddressId,
      selectedAddressIdType: typeof this.selectedAddressId
    });

    // Always use smart payment routing endpoint for better payment handling
    this.orderService.createOrderWithPayment(orderData).subscribe({
      next: (response) => {
        console.log('✅ Order created with smart payment routing:', response);
        clearTimeout(paymentTimeout);
        this.isLoading = false;
        
        // Log the complete response for debugging
        console.log('🔍 Complete response:', JSON.stringify(response, null, 2));
        
        if (response.success) {
          // Determine payment flow based on response
          const paymentFlow = response.paymentFlow || 'UNKNOWN';
          console.log('🔄 Payment flow determined:', paymentFlow);
          
          switch (paymentFlow) {
            case 'DIRECT_TO_SUPPLIER':
              this.handleDirectSupplierPayment(response);
              break;
            case 'PLATFORM':
            case 'PLATFORM_PAYMENT':
              this.handlePlatformPayment(response);
              break;
            default:
              console.warn('⚠️ Unknown payment flow:', paymentFlow);
              this.navigateToOrder(response.orderId);
          }
        } else {
          this.snackBar.open(response.message || 'Erreur lors de la création de la commande', 'Fermer', { duration: 5000 });
        }
      },
      error: (error) => {
        console.error('❌ Error creating order with payment routing:', error);
        clearTimeout(paymentTimeout);
        this.isLoading = false;
        this.snackBar.open('Erreur lors de la création de la commande', 'Fermer', { duration: 5000 });
      }
    });
  }

  // Handle direct supplier payment flow
  private handleDirectSupplierPayment(response: any): void {
    console.log('💳 Direct supplier payment flow detected');
    console.log('📋 Full response:', response);
    console.log('🔍 Response keys:', Object.keys(response));
    console.log('🔍 paymentUrl value:', response.paymentUrl);
    console.log('🔍 paymentIntentId value:', response.paymentIntentId);
    console.log('🔍 hasPaymentSystem value:', response.hasPaymentSystem);
    console.log('🔍 stripeFallback value:', response.stripeFallback);
    
    if (response.supplierName) {
      this.snackBar.open(
        `Paiement pour le fournisseur: ${response.supplierName}`, 
        'Fermer', 
        { duration: 5000 }
      );
    }
    
    // Check if we have a payment URL to redirect to
    if (response.paymentUrl) {
      console.log('🔗 Supplier has payment system, redirecting to:', response.paymentUrl);
      console.log('✅ Supplier payment system detected:', response.hasPaymentSystem);
      
      // Show confirmation dialog before redirecting
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Redirection vers le paiement',
          message: `Vous allez être redirigé vers la page de paiement du fournisseur ${response.supplierName || 'fournisseur'}.`,
          confirmText: 'Continuer',
          cancelText: 'Annuler'
        } as ConfirmationDialogData
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Redirect to supplier payment URL directly
          console.log('✅ User confirmed, redirecting to:', response.paymentUrl);
          
          console.log('🔗 Redirecting to supplier payment system');
          console.log('⚠️ Note: If supplier redirects to Stripe, you will be redirected to our success page after payment');
          
          // Store order info in sessionStorage for potential Stripe redirect
          sessionStorage.setItem('supplier_order_info', JSON.stringify({
            orderId: response.orderId,
            supplierId: response.supplierId,
            paymentType: 'supplier_own',
            timestamp: Date.now()
          }));
          
          // Also store info for Stripe redirect since supplier seems to redirect to Stripe
          sessionStorage.setItem('stripe_redirect_info', JSON.stringify({
            orderId: response.orderId,
            supplierId: response.supplierId,
            paymentType: 'stripe_platform',
            timestamp: Date.now()
          }));
          
          window.location.href = response.paymentUrl;
        } else {
          // User cancelled, navigate to order page instead
          console.log('❌ User cancelled, navigating to order page');
          this.navigateToOrder(response.orderId);
        }
      });
    } else {
      // Supplier doesn't have payment system, show Stripe form
      console.log('💳 Supplier has no payment system, showing Stripe form');
      console.log('❌ Payment URL is null, using Stripe fallback');
      console.log('🔑 Payment Intent ID:', response.paymentIntentId);
      console.log('🏪 Supplier:', response.supplierName);
      console.log('📊 Has Payment System:', response.hasPaymentSystem);
      console.log('💳 Stripe Fallback:', response.stripeFallback);
      
      // Check if we have the required data for Stripe
      if (!response.paymentIntentId) {
        console.error('❌ Missing paymentIntentId for Stripe fallback');
        this.snackBar.open('Erreur: Impossible de créer la session de paiement Stripe', 'Fermer', { duration: 5000 });
        this.navigateToOrder(response.orderId);
        return;
      }
      
      console.log('✅ All required data present, showing Stripe payment form');
      this.showStripePaymentForm(response);
    }
  }

  // Handle platform payment flow
  private handlePlatformPayment(response: any): void {
    console.log('💳 Platform payment flow detected');
    console.log('📋 Full response:', response);
    console.log('🔍 Response keys:', Object.keys(response));
    console.log('🔍 paymentIntentId value:', response.paymentIntentId);
    console.log('🔍 clientSecret value:', response.clientSecret);
    
    // Check if we have Stripe payment intent
    if (response.paymentIntentId) {
      console.log('💳 Stripe payment intent detected, redirecting to Stripe');
      
      // Show confirmation dialog before redirecting to Stripe
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Redirection vers Stripe',
          message: 'Vous allez être redirigé vers la page de paiement sécurisée de Stripe.',
          confirmText: 'Payer maintenant',
          cancelText: 'Annuler'
        } as ConfirmationDialogData
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Redirect to Stripe payment page using paymentIntentId
          console.log('✅ User confirmed, redirecting to Stripe payment');
          this.showStripeForm(response);
        } else {
          // User cancelled, navigate to order page instead
          console.log('❌ User cancelled, navigating to order page');
          this.navigateToOrder(response.orderId);
        }
      });
    } else {
      // No Stripe payment intent, show platform payment message
      if (response.supplierCount > 1) {
        this.snackBar.open(
          `Paiement via plateforme (${response.supplierCount} fournisseurs)`, 
          'Fermer', 
          { duration: 5000 }
        );
      } else {
        this.snackBar.open('Paiement via plateforme', 'Fermer', { duration: 3000 });
      }
      
      // Navigate to order detail page
      this.navigateToOrder(response.orderId);
    }
  }



  // Show Stripe payment form for suppliers without payment system
  private showStripePaymentForm(response: any): void {
    console.log('💳 Showing Stripe payment form for supplier order');
    console.log('📋 Response in showStripePaymentForm:', response);
    console.log('🔍 About to open confirmation dialog...');
    
    // Create a simple Stripe payment form
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Paiement Stripe',
        message: `Le fournisseur ${response.supplierName || 'fournisseur'} n'a pas de système de paiement. Veuillez utiliser Stripe pour finaliser votre commande.`,
        confirmText: 'Payer avec Stripe',
        cancelText: 'Annuler'
      } as ConfirmationDialogData
    });
    
    console.log('🔍 Confirmation dialog opened, waiting for user response...');
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('🔍 Dialog closed with result:', result);
      if (result) {
        // Show Stripe payment form
        console.log('✅ User confirmed Stripe payment, calling showStripeForm');
        this.showStripeForm(response);
      } else {
        // User cancelled, navigate to order page
        console.log('❌ User cancelled Stripe payment');
        this.navigateToOrder(response.orderId);
      }
    });
  }

  // Display embedded Stripe payment form
  private showStripeForm(response: any): void {
    try {
      console.log('💳 Opening embedded Stripe payment form for order:', response.orderId);
      console.log('🔍 Response in showStripeForm:', response);
      
      if (response.paymentIntentId && response.clientSecret) {
        // Store payment data for the embedded form
        this.currentPaymentData = {
          orderId: response.orderId,
          amount: this.totalWithShipping,
          clientSecret: response.clientSecret
        };
        
        // Show the payment form section
        this.showPaymentForm = true;
        
        console.log('✅ Embedded Stripe payment form data prepared');
        
      } else {
        // Missing required data, show error
        console.error('❌ Missing paymentIntentId or clientSecret in showStripeForm');
        this.snackBar.open(
          'Erreur: Impossible de créer la session de paiement Stripe', 
          'Fermer', 
          { duration: 5000 }
        );
        this.navigateToOrder(response.orderId);
      }
      
    } catch (error) {
      console.error('❌ Error opening Stripe form:', error);
      this.snackBar.open('Erreur lors de l\'ouverture du formulaire Stripe', 'Fermer', { duration: 5000 });
      this.navigateToOrder(response.orderId);
    }
  }

  // Safe navigation to order
  private navigateToOrder(orderId: number): void {
    if (orderId) {
      console.log('🧭 Navigating to order:', orderId);
      this.router.navigate(['/orders', orderId]);
    } else {
      console.warn('⚠️ Order ID not found, redirecting to orders list');
      this.router.navigate(['/orders']);
    }
  }

  // Helper methods
  getCurrency(countryCode: string): string {
    const country = this.countries.find(c => c.code === countryCode);
    return country?.currency || 'MAD';
  }

  getCountryName(countryCode: string): string {
    const country = this.countries.find(c => c.code === countryCode);
    return country?.name || countryCode;
  }

  getCountryFlag(countryCode: string): string {
    const country = this.countries.find(c => c.code === countryCode);
    return country?.name.split(' ')[0] || '🏳️';
  }

  getDeliveryTime(countryCode: string, city?: string): number | null {
    if (countryCode === 'MA') {
      if (city) {
        const cityData = this.moroccoCities.find(c => c.name === city);
        return cityData ? 1 : 2;
      }
      return 2;
    }
    return 5;
  }

  // Form validation helper
  isFormValidForPayment(): boolean {
    if (this.useNewAddress) {
      return this.addressForm.valid;
    } else {
      return this.selectedAddressId !== null;
    }
  }

  // Payment form event handlers
  onPaymentSuccess(paymentIntent: any): void {
    console.log('✅ Payment successful:', paymentIntent);
    this.snackBar.open('Paiement réussi!', 'Fermer', { duration: 5000 });
    
    // Store order ID before clearing data
    const orderId = this.currentPaymentData?.orderId;
    
    // Clear payment form
    this.showPaymentForm = false;
    this.currentPaymentData = null;
    
    // Navigate to success page instead of order page
    if (orderId) {
      console.log('🎉 Redirecting to success page for order:', orderId);
      this.router.navigate(['/orders/success'], {
        queryParams: {
          order_id: orderId,
          payment_type: 'platform',
          payment_intent: paymentIntent.id
        }
      });
    } else {
      console.warn('⚠️ Order ID not found, redirecting to orders list');
      this.router.navigate(['/orders']);
    }
  }

  onPaymentCancel(): void {
    console.log('❌ Payment cancelled by user');
    this.snackBar.open('Paiement annulé', 'Fermer', { duration: 3000 });
    
    // Clear payment form
    this.showPaymentForm = false;
    this.currentPaymentData = null;
    
    // Stay on checkout page, user can try again
    console.log('🔄 Payment cancelled, staying on checkout page');
  }

  onPaymentError(errorMessage: string): void {
    console.error('❌ Payment error:', errorMessage);
    this.snackBar.open(errorMessage, 'Fermer', { duration: 5000 });
    // Don't hide payment form on error, let user retry or cancel
  }
}



