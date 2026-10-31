import {Component, OnInit, signal} from '@angular/core';
import {ApexAxisChartSeries, ApexXAxis, ChartComponent} from "ngx-apexcharts";
import {CommonMessage} from "fusio-sdk";
import {MessageComponent} from "../../../projects/fusio-sdk/src/lib/component/message/message.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    ChartComponent,
    MessageComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  errorsPerOperation = signal<ChartOptions|undefined>(undefined);
  incomingRequests = signal<ChartOptions|undefined>(undefined);
  incomingTransactions = signal<ChartOptions|undefined>(undefined);
  mostUsedOperations = signal<ChartOptions|undefined>(undefined);
  timePerOperation = signal<ChartOptions|undefined>(undefined);
  testCoverage = signal<PieChartOptions|undefined>(undefined);
  mostUsedActivities = signal<ChartOptions|undefined>(undefined);
  activitiesPerUser = signal<ChartOptions|undefined>(undefined);
  userRegistrations = signal<ChartOptions|undefined>(undefined);

  response = signal<CommonMessage|undefined>(undefined);

  async ngOnInit(): Promise<void> {
    this.generateDemoData();
  }

  private generateDemoData(): void {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // 1. Errors Per Operation (Bar/Column Chart)
    this.errorsPerOperation.set({
      series: [{ name: 'Errors', data: [12, 18, 4, 25, 9, 15] }],
      xaxis: { categories: ['GET /user', 'POST /item', 'PUT /order', 'DELETE /file', 'GET /search', 'POST /auth'] }
    });

    // 2. Incoming Requests (Line Chart)
    this.incomingRequests.set({
      series: [{ name: 'Requests', data: [1200, 1900, 1500, 2200, 3100, 2800, 3500] }],
      xaxis: { categories: days }
    });

    // 3. Incoming Transactions (Area/Line Chart)
    this.incomingTransactions.set({
      series: [{ name: 'Transactions ($)', data: [4500, 5200, 4800, 6100, 7500, 8200, 9100] }],
      xaxis: { categories: days }
    });

    // 4. Most Used Operations (Bar Chart)
    this.mostUsedOperations.set({
      series: [{ name: 'Calls', data: [45000, 38000, 31000, 24000, 19000] }],
      xaxis: { categories: ['GET /api/products', 'GET /api/user', 'POST /api/order', 'GET /api/category', 'POST /api/login'] }
    });

    // 5. Time Per Operation / Latency (Line Chart)
    this.timePerOperation.set({
      series: [{ name: 'Avg Latency (ms)', data: [45, 120, 85, 60, 35, 90] }],
      xaxis: { categories: ['GET /user', 'POST /item', 'PUT /order', 'DELETE /file', 'GET /search', 'POST /auth'] }
    });

    // 6. Test Coverage (Pie/Donut Chart)
    this.testCoverage.set({
      series: [85, 15],
      labels: ['Covered', 'Uncovered']
    });

    // 7. Most Used Activities (Bar Chart)
    this.mostUsedActivities.set({
      series: [{ name: 'Count', data: [300, 450, 200, 150, 400] }],
      xaxis: { categories: ['Login', 'Update Profile', 'Create Item', 'Delete Item', 'Export Data'] }
    });

    // 8. Activities Per User (Line Chart)
    this.activitiesPerUser.set({
      series: [{ name: 'Activities', data: [5, 8, 12, 7, 15, 10, 14] }],
      xaxis: { categories: days }
    });

    // 9. User Registrations (Bar/Column Chart)
    this.userRegistrations.set({
      series: [{ name: 'New Users', data: [150, 230, 180, 290, 340, 410] }],
      xaxis: { categories: months.slice(0, 6) }
    });
  }

}

export type ChartOptions = {
  series: ApexAxisChartSeries
  xaxis: ApexXAxis
};

export type PieChartOptions = {
  series: Array<number>
  labels: Array<string>
};
