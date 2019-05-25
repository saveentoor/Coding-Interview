const vendingMachine = require("../src/vending-machine");
const inventory = new vendingMachine("./inventory");

describe("Vending Machine", () => {
  //   describe("The current inventory in the vending machine", () => {
  //     it("Should give total number of current items in vending machine", () => {
  //       const result = inventory.currentInventory();
  //       expect(result).toEqual(["twix", 10]);
  //     });
  //   });

  describe("Purchasing an item that does not exist", () => {
    it("should return a message that says item does not exist", () => {
      const result = inventory.purchaseAnItem("a11");
      expect(result).toEqual("Item does not exist");
    });
  });

  describe("When an item is purchased, update that item from inventory each time", () => {
    it("should return the updated count from the inventory list", () => {
      const result = inventory.purchaseAnItem(["cookies: 10"]);
    });
  });

  describe("If you put in no money", () => {
    it("should return a message that says, please put in correct amount", () => {
      const result = inventory.purchaseAnItem("a4");
      expect(result).toEqual(
        `Please put in ${inventory.getProduct()["a4"].price}`
      );
    });
  });

  describe("If purchasing an item that is out of stock", () => {
    it("should return a message that says please select another item", () => {
      const result = inventory.purchaseAnItem("a2", 1);
      expect(result).toEqual("Please select another item");
    });
  });

  // describe("If purchasing an item and put in too much money", () => {
  //     it("should return name of the item and the extra money" , () =>{
  //         const result = inventory.purchaseAnItem();
  //         expect(result).toEqual("");
  //     })
  // })
});
