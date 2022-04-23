import { ValidationComponent } from './components/auth-area/validation/validation.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { CartComponent } from './components/cart-area/cart/cart.component';
import { AddProductComponent } from './components/product-area/add-product/add-product.component';
import { ProductDetailsComponent } from './components/product-area/product-details/product-details.component';
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { UpdateProductComponent } from './components/product-area/update-product/update-product.component';
import { AuthGuard } from './services/auth.guard';
import { IncompleteGuard } from './services/incomplete.guard';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { AuthAdminGuard } from './services/auth-admin.guard';

const routes: Routes = [
    // { path: "tasks", component: TasksListComponent },
    {
        path: "home",
        component: HomeComponent
    },

    {
        path: "register",
        component: RegisterComponent
    },

    {
        path: "validation",
        component: ValidationComponent
    },

    {
        path: "login",
        component: LoginComponent
    },

    {
        path: "logout",
        component: LogoutComponent
    },

    {
        path: "products",
        canActivate: [AuthGuard],
        component: ProductListComponent
    },


    {
        path: "order",
        canActivate: [AuthGuard],
        canDeactivate: [IncompleteGuard],
        component: OrderComponent
    },

    {
        path: "products/new",
        canActivate: [AuthAdminGuard],
        canDeactivate: [IncompleteGuard],
        component: AddProductComponent
    },

    {
        path: "products/edit/:id",
        canActivate: [AuthAdminGuard],
        component: UpdateProductComponent
    },

    {
        path: "products/details/:id",
        canActivate: [AuthGuard],
        component: ProductDetailsComponent
    },

    {
        path: "**",
        redirectTo: "/home",
        pathMatch: "full"
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
