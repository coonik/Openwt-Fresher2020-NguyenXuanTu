import { AccountService } from "./../account.service";
import { LoggingService } from "./../logging.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
  providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService
  ) {
    this.accountService.statusUpdate.subscribe((status: string) =>
      alert("New status: " + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
