import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "rxjs-sandbox1";
  componentsList: string[] = ['Observables', 'Subjects', 'Multicasted Observable', 'Combinations'];
}
