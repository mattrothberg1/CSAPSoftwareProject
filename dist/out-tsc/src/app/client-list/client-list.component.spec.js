import { async, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
describe('ClientListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ClientListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClientListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//https://github.com/SinghDigamber/angular-httpclient-app/blob/master/src/app/employees-list/employees-list.component.html
//# sourceMappingURL=client-list.component.spec.js.map