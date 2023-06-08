const Ship = (length) => {
  let hits = 0;
  let sunk = false;

  const hit = () => {
    hits++;
    sunk = hits === length ? true : false;
  };

  const isSunk = () => sunk;

  return {
    hit,
    isSunk,
  };
};

const Gameboard = () => {
  const ships = [];
  const missedAttacks = [];

  const placeShip = (ship, coordinates) => {
    ships.push({ ship, coordinates });
  };

  const receiveAttack = (coordinates) => {
    const ship = findShip(coordinates);

    if (ship) {
      ship.hit(coordinates);
    } else {
      missedAttacks.push(coordinates);
    }
  };

  const findShip = (coordinates) => {
    for (const { ship, coordinates: shipCoordinates } of ships) {
      for (const shipCoordinate of shipCoordinates) {
        if (shipCoordinate === coordinates) {
          return ship;
        }
      }
    }
    return null;
  };

  const allShipsSunk = () => {
    return ships.every(({ ship }) => ship.isSunk());
  };

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedAttacks,
  };
};

export { Ship, Gameboard };
