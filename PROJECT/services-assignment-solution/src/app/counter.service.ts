export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  totalActive = 2;

  incrementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log("Active to Inactive: " + this.activeToInactiveCounter);
  }

  incrementInActiveToActive() {
    this.inactiveToActiveCounter++;
    console.log("Inactive to Active: " + this.inactiveToActiveCounter);
  }

  totalUser(i) {
    this.totalActive += i;
    console.log("Total active user:" + this.totalActive);
    console.log("Total inactive user:" + (4 - this.totalActive));
  }
}
