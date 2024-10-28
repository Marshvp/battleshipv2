/**
 * @jest-environment jsdom
 */

import GameBoard from '../src/Classes/gameBoard';
import Ship from '../src/Classes/shipClass';

jest.mock('../src/Classes/shipClass', () => {
  return jest.fn().mockImplementation((length) => {
    return {
      length,
      hits: 0,
      positions: [],
      recordHit: jest.fn(function () {
        this.hits++;
      }),
      isSunk: jest.fn(function () {
        return this.hits >= this.length;
      })
    };
  });
});

describe('GameBoard', () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
    Ship.mockClear(); // Clear mock for each test
  });

  it('should initialize with an empty set of ships and no occupied positions', () => {
    expect(gameBoard.ships.length).toBe(0);
    expect(gameBoard.occupiedPositions.size).toBe(0);
    expect(gameBoard.missedAttack.size).toBe(0);
  });

  it('should place a ship without overlap', () => {
    const result = gameBoard.placeShip(0, 0, 3, 'horizontal');
    expect(result).toBe(true);
    expect(gameBoard.ships.length).toBe(1);
    expect(gameBoard.occupiedPositions.has('0, 0')).toBe(true);
    expect(gameBoard.occupiedPositions.has('1, 0')).toBe(true);
    expect(gameBoard.occupiedPositions.has('2, 0')).toBe(true);
  });

  it('should not place a ship if it overlaps with an existing one', () => {
    gameBoard.placeShip(0, 0, 3, 'horizontal');
    const result = gameBoard.placeShip(1, 0, 3, 'horizontal');
    expect(result).toBe(false); // Ship overlaps with an existing ship
    expect(gameBoard.ships.length).toBe(1); // Only the first ship should be placed
  });

  it('should register a hit on a ship', () => {
    gameBoard.placeShip(0, 0, 3, 'horizontal');
    const result = gameBoard.receiveAttack(1, 0);
    expect(result).toBe('hit');
    expect(gameBoard.ships[0].recordHit).toHaveBeenCalledTimes(1);
  });

  it('should register a miss for an empty coordinate', () => {
    gameBoard.placeShip(0, 0, 3, 'horizontal');
    const result = gameBoard.receiveAttack(5, 5);
    expect(result).toBe('miss');
    expect(gameBoard.missedAttack.has('5, 5')).toBe(true);
  });

  it('should not allow repeated attacks on the same coordinate that was missed', () => {
    gameBoard.placeShip(0, 0, 3, 'horizontal');
    gameBoard.receiveAttack(5, 5); // First attack is a miss
    const result = gameBoard.receiveAttack(5, 5); // Repeated attack
    expect(result).toBe('again');
    expect(gameBoard.missedAttack.size).toBe(1); // Only one missed attack should be recorded
  });

  it('should correctly identify when all ships are sunk', () => {
    gameBoard.placeShip(0, 0, 2, 'horizontal');
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.allSunk()).toBe(true);
  });

  it('should correctly identify when not all ships are sunk', () => {
    gameBoard.placeShip(0, 0, 2, 'horizontal');
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.allSunk()).toBe(false);
  });
});
