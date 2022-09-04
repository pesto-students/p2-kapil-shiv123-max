class car {
  constructor(registration_number, color) {
    this.registration_number = registration_number;
    this.color = color;
  }

  getDetails() {
    return [this.registration_number, this.color];
  }
}

export default car;
