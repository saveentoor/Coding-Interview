const vendingMachine = require("../src/vending-machine");
const inventory = new vendingMachine("./inventory");

describe("Vending Machine", () => {
  describe("The current inventory in the vending machine", () => {
    it("Should give total number of current items in vending machine", () => {
      const result = inventory.currentInventory();
      expect(result).toEqual([
        "twix: 10",
        "reese: 0",
        "snickers: 10",
        "mars: 10",
        "o'henry: 10",
        "cookies: 10",
        "chips: 10",
        "pop: 10",
        ": 10",
        "gum: 10"
      ]);
    });
  });

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

  describe("If purchasing an item and put in too much money", () => {
    it("should return name of the item and the extra money", () => {
      const result = inventory.purchaseAnItem("a6", 2);
      expect(result).toEqual({ name: "cookies", change: undefined });
    });
  });

  describe("If purchasing an item with exact change", () => {
    it("should the item and no change back", () => {
      const result = inventory.purchaseAnItem("a7", 1.5);
      expect(result).toEqual({ name: "chips", change: 0 });
    });
  });

  describe("When making a purcahse and not putting in enough money", () => {
    it("should return the name of the item and the remaining change", () => {
      const result = inventory.purchaseAnItem("a8", 1);
      expect(result).toEqual({ name: "pop", change: 0.5 });
    });
  });

  describe("When refilling the inventory", () => {
    it("should return a list of items of the inventory", () => {
      const result = inventory.refillInventory();
      expect(result).toEqual([
        "twix: 10",
        "reese: 10",
        "snickers: 10",
        "mars: 10",
        "o'henry: 10",
        "cookies: 10",
        "chips: 10",
        "pop: 10",
        ": 10",
        "gum: 10"
      ]);
    });
  });

  describe("When displaying the current change in the vending machine", () => {
    it("should return a list of the current change in the vending machine", () => {
      const result = inventory.displayCurrentChange();
      expect(result).toEqual([
        ["QUARTERS", 33],
        ["LOONIES", 40.0],
        ["TOONIES", 50.0]
      ]);
    });
  });

  describe("When resupplying the change in the vending machine", () => {
    it("should return a list of the change in the vending machine", () => {
      const result = inventory.reSupplyChange();
      expect(result).toEqual([
        ["QUARTERS", 50.0],
        ["LOONIES", 60.0],
        ["TOONIES", 100.0]
      ]);
    });
  });

  describe("When making a purcahse that does not have a name", () => {
    it("should return a error message saying item is not available", () => {
      const result = inventory.purchaseAnItem("a9", 1.5);
      expect(result).toEqual("Not available");
    });
  });

  describe("When making a purcahse that does not have a price", () => {
    it("should return a error message saying item is not available", () => {
      const result = inventory.purchaseAnItem("a10", 1.5);
      expect(result).toEqual("Not available");
    });
  });
});
