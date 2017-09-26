import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;

    constructor(private dishService: DishService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.dishService.getDishIds()
            .subscribe(dishIds => this.dishIds = dishIds);

        this.route.params
            .switchMap((params: Params) => this.dishService.getDish(+params['id']))
            .subscribe(dish => {
                this.dish = dish;
                this.setPrevNext(dish.id)
            });
    }

    setPrevNext(dishId: number) {
        let index = this.dishIds.indexOf(dishId);
        let length = this.dishIds.length;
        this.prev = this.dishIds[(length + index - 1) % length];
        this.next = this.dishIds[(length + index + 1) % length];
    }

    goBack(): void {
        this.location.back();
    }
}
