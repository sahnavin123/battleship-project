import { Ship, Gameboard } from "./battleship";

describe("Ship", () => {
  test("ship hit() should increase the number of hits", () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard", () => {
  test("placeShip() should add a ship to the gameboard", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    gameboard.placeShip(ship, ["A1", "A2", "A3"]);
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test("receiveAttack() should correctly handle hit and miss", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    gameboard.placeShip(ship, ["A1", "A2", "A3"]);
    gameboard.receiveAttack("A1"); // Hit
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack("B2"); // Miss
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack("A2"); // Hit
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack("C3"); // Miss
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack("A3"); // Hit
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("receiveAttack() should keep track of missed attacks", () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    gameboard.placeShip(ship, ["A1", "A2", "A3"]);
    gameboard.receiveAttack("B1"); // Miss
    gameboard.receiveAttack("C2"); // Miss
    expect(gameboard.allShipsSunk()).toBe(false);
    expect(gameboard.missedAttacks).toEqual(["B1", "C2"]);
  });

  test("allShipsSunk() should return true when all ships are sunk", () => {
    const gameboard = Gameboard();
    const ship1 = Ship(2);
    const ship2 = Ship(3);
    gameboard.placeShip(ship1, ["A1", "A2"]);
    gameboard.placeShip(ship2, ["B1", "B2", "B3"]);

    gameboard.receiveAttack("A1"); // Hit
    gameboard.receiveAttack("A2"); // Hit
    gameboard.receiveAttack("B1"); // Hit
    gameboard.receiveAttack("B2"); // Hit
    gameboard.receiveAttack("B3"); // Hit

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
