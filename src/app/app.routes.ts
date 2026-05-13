import { Routes} from '@angular/router';
import { Heroes } from './heroes/heroes';
import { Dashboard } from './dashboard/dashboard';
import { HeroDetail } from './hero-detail/hero-detail';



export const routes: Routes = [

    { path: 'heroes', component: Heroes},
    { path: 'dashboard', component: Dashboard},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'detail/:id', component: HeroDetail}
];

