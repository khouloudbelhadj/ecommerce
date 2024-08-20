import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { NotificationFormComponent } from './notification/notification-form/notification-form.component';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductListComponentAdmin } from './product/product-list-admin/product-list-admin.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductDetailComponentAdmin } from './product/product-detail-admin/product-detail-admin.component';


import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderFormComponent } from './order/order-form/order-form.component';

import { OrderLineListComponent } from './orderLine/order-line-list/order-line-list.component';

import { AdressListComponent } from './adress/adress-list/adress-list.component';
import { AdressFormComponent } from './adress/adress-form/adress-form.component';

import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryListComponentAdmin } from './category/category-list-admin/category-list-admin.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryProductsComponent } from './category/category-product/category-product.component';
import { CategoryProductsComponentAdmin } from './category/category-product-admin/category-product-admin.component';


import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component'; 
import { UserLogoutComponent } from './user/user-logout/user-logout.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserForgotPasswordComponent } from './user/user-forgot-password/user-forgot-password.component';
import { UserRecoverPasswordComponent } from './user/user-recover-password/user-recover-password.component';



import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';

import { CartPageListComponent } from './cart-page/cart-page-list/cart-page-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'notification',
    children: [
      { path: 'list', component: NotificationListComponent },
      { path: 'form', component: NotificationFormComponent },
      { path: 'form/:id/edit', component: NotificationFormComponent }

    ]
  },
  { 
    path: 'product',
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'list/admin', component: ProductListComponentAdmin },
      { path: 'form', component: ProductFormComponent },
      { path: 'form/:id', component: ProductFormComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'detail/admin/:id', component: ProductDetailComponentAdmin }

    ]
  },
  {
    path: 'order',
    children: [
      { path: 'list', component: OrderListComponent },
      { path: 'form', component: OrderFormComponent },
      { path: 'form/:id', component: OrderFormComponent }
    ]
  },
  {
    path: 'order-line',
    children: [
      { path: 'list', component: OrderLineListComponent }
    ]
  },
  {
    path: 'adress',
    children: [
      { path: 'list', component: AdressListComponent },
      { path: 'form', component: AdressFormComponent },
      { path: 'form/:id', component: AdressFormComponent }
    ]
  },
  {
    path: 'category',
    children: [
      { path: 'list', component: CategoryListComponent },
      { path: 'list/admin', component: CategoryListComponentAdmin },
      { path: 'form', component: CategoryFormComponent },
      { path: 'form/:id', component: CategoryFormComponent },
      { path: 'category-product/:id', component: CategoryProductsComponent },
      { path: 'category-product/admin/:id', component: CategoryProductsComponentAdmin }
    ]
  },
  {
    path: 'user',
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'form', component: UserFormComponent },
      { path: 'form/:id', component: UserFormComponent },
      { path: 'detail/:id', component: UserDetailComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'logout', component: UserLogoutComponent } ,
      { path: 'registration', component: UserRegistrationComponent } ,
      { path: 'forgot-password', component: UserForgotPasswordComponent } ,
      { path: 'recover-password', component: UserRecoverPasswordComponent } 



    ]
  },
  {
    path: 'payment',
    children: [
      { path: 'list', component: PaymentListComponent },
      { path: 'form', component: PaymentFormComponent },
      { path: 'form/:id', component: PaymentFormComponent }
    ]
  },
  {
    path: 'cart-page',
    children: [
      { path: 'cart-page-list', component: CartPageListComponent }
    ]
  },
  
];
