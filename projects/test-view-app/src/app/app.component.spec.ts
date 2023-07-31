import { TestBed } from '@angular/core/testing';
import { AppComponent, TypeViewComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [AppComponent]
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'test'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.viewComponent).toEqual(TypeViewComponent.Picker);
    });
});
