import {Component, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[MessageService, ConfirmationService]
})
export class DashboardComponent implements OnInit {
  employees: any[];
  visible: boolean = false;
  value: any;

  showDialog() {
    this.visible = true;
  }

  ngOnInit(): void {
    this.employees = [
      {}
    ]
  }

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService) {}

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }




}
