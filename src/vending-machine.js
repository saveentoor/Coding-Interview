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
  getProduct() {
    return this.product;
  }
  //function for streact goal
  calulatingChange(change, price, cost) {
    let amountOwned = cost - price;
    if (amountOwned === 0) {
      return 0;
    }
    const valueOfCoin = [
      { name: "TOONIES", value: 2.0 },
      { name: "LOONIES", value: 1.0 },
      { name: "QUARTERS", value: 0.25 }
    ];
    const changeReturned = change.reduce((received, currency) => {
      received[currency[0]] = currency[1]; //compare value received to current value
      return received;
    }, {});
    const amountOfCoin = valueOfCoin.reduce((received, currency) => {
      let amount = 0;

      while (currency.value <= amountOwned && amountOwned !== 0) {
        amountOwned -= currency.value;
        changeReturned[currency.name] -= currency.value;
        amount++;
      }
      if (amount > 0) {
        received.push([currency.name, amount]);
      }
      return received;
    }, []);
    change.forEach(asset => {
      asset[1] = changeReturned[asset[0]];
      return amountOfCoin;
    });
  }

  refillInventory() {
    const refillInventory = [];
    const allInventory = Object.keys(this.product);

    allInventory.forEach(item => {
      this.product[item].quanity = this.product[item].maxQuanity;
      refillInventory.push(
        `${this.product[item].name}: ${this.product[item].quanity}`
      );
    });
    return refillInventory;
  }

  reSupplyChange() {
    this.change.max.forEach((type, amount) => {
      this.change.current[amount] = type;
    });
    return this.change.current;
  }

  displayCurrentChange() {
    return this.change.current;
  }

  purchaseAnItem(item, cost) {
    if (!this.product[item]) {
      return "Item does not exist";
    } else if (this.product[item].quanity === 0) {
      //if product quant. is 0
      return "Please select another item";
    } else if (!cost) {
      return `Please put in ${this.product[item].price}`; //plz put in change
    } else if (this.product[item].price - cost > 0) {
      //put in too much money
      const money = this.product[item].price - cost;
      return {
        name: this.product[item].name,
        change: money
      };
    }
    this.product[item].quanity--; //subtracts 1 from quanity count

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
