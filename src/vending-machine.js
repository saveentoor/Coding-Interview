//function
class VendingMachine {
  constructor(items) {
    this.data = require(items);
    this.product = this.data.stock;
    this.change = this.data.change;
  }
  //function for checking current inventory
  currentInventory() {
    const inv = [];
    const allItems = Object.keys(this.product);
    allItems.forEach(item => {
      inv.push(`${this.product[item].name}: ${this.product[item].quanity}`);
    });
    return inv;
  }

  calulatingChange(change, price, cost) {
    let amountOwned = cost - price;
    if (amountOwned === 0) {
      return 0;
    }
  }
  getProduct() {
    return this.product;
  }
  purchaseAnItem(item, cost) {
    if (!this.product[item]) {
      //type in wrong id
      return "Item does not exist";
    } else if (this.product[item].quanity === 0) {
      //if product quantity is 0 (out of stock)
      return "Please select another item";
    } else if (!cost) {
      //do not put in enough money
      return `Please put in ${this.product[item].price}`; //please put in money
      // name: this.product[item].name //and name of item
    } else if (this.product[item].price - cost > 0) {
      //if you put in too much money
      const change = this.product[item].price - cost;
      return {
        name: this.product[item].name,
        change: change
      };
    }
    this.product[item].quanity--; //subtracts 1 from quanity count everytime purchased
    return {
      name: this.product[item].name,
      change: this.calulatingChange(
        this.change.current,
        this.product[item].price,
        cost
      )
    };
  }
}
module.exports = VendingMachine;

