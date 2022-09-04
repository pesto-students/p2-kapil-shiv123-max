import car from "./car.js";

class parkingLot {
  constructor(size) {
    this.size = size;
    this.slots = new Array(size).fill(null);
  }

  getNextFreeSlot() {
    for (let i = 0; i < this.size; ++i) {
      if (this.slots[i] === null) return i;
    }
    return null;
  }

  park(car) {
    if (this.getNextFreeSlot() === null) {
      console.log("Sorry, parking lot is full.");
      return;
    }
    const freeSlot = this.getNextFreeSlot();
    this.slots[freeSlot] = car;
    console.log(`Allocated slot number: ${freeSlot + 1}`);
  }

  leave(slot) {
    if (!this.slots[slot - 1]) {
      console.log("Slot is already empty.");
    }
    this.slots[slot - 1] = null;
    console.log(`Slot number ${slot} is free.`);
  }

  status() {
    let status = [];

    for (let i = 0; i < this.size; ++i) {
      if (this.slots[i]) status.push({
        slot: i+1,
        registration_number: this.slots[i].registration_number,
        color: this.slots[i].color
      });
    }
    console.table(status);
  }

  filterByColor(color) {
    let matches = this.slots
      .filter((element) => element?.color === color)
      .map((element) => element.registration_number);
    matches.length === 0
      ? console.log("Not Found")
      : console.log(matches.join(", "));
  }

  filterSlots(filter_type, filter) {
    let matches = [];
    switch (filter_type) {
      case "color":
        {
          for (let i = 0; i < this.size; ++i) {
            if (this.slots[i]?.color === filter) matches.push(i + 1);
          }
        }
        break;
      case "registration number":
        {
          for (let i = 0; i < this.size; ++i) {
            if (this.slots[i]?.registration_number === filter)
              matches.push(i + 1);
          }
        }
        break;
      default: {
        console.error("Invalid filter type");
      }
    }
    matches.length === 0
      ? console.log("Not found")
      : console.log(matches.join(", "));
  }
}

export default parkingLot;
