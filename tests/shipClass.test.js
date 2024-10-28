/**
 * @jest-environment jsdom
 */

import Ship from '../src/Classes/shipClass';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship('ship1', 3);
  });

  it('should initialize with the correct id, length, and zero hits', () => {
    expect(ship.id).toBe('ship1');
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.positions).toEqual([]);
  });

  it('should increment the number of hits when recordHit is called', () => {
    ship.recordHit();
    expect(ship.hits).toBe(1);
    ship.recordHit();
    expect(ship.hits).toBe(2);
  });

  it('should return the correct number of hits after multiple hits', () => {
    ship.recordHit();
    ship.recordHit();
    expect(ship.recordHit()).toBe(3);
  });

  it('should return false from isSunk if the ship is not fully hit', () => {
    ship.recordHit();
    expect(ship.isSunk()).toBe(false);
    ship.recordHit();
    expect(ship.isSunk()).toBe(false);
  });

  it('should return true from isSunk when the ship is fully hit', () => {
    ship.recordHit();
    ship.recordHit();
    ship.recordHit();
    expect(ship.isSunk()).toBe(true);
  });
});
