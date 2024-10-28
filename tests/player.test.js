/**
 * @jest-environment jsdom
 */

import Player from '../src/Classes/player';
import GameBoard from '../src/Classes/gameBoard'; // Import GameBoard to verify player board instance

jest.mock('../src/Classes/gameBoard', () => {
  return jest.fn().mockImplementation(() => {
    return {
      someProperty: 'mocked value' // You can add any mocked property if needed
    };
  });
});

describe('Player', () => {
  let player;

  beforeEach(() => {
    GameBoard.mockClear(); // Clear mock for each test
    player = new Player('PlayerOne');
  });

  it('should initialize with the correct name', () => {
    expect(player.name).toBe('PlayerOne');
  });

  it('should initialize with a GameBoard instance', () => {
    expect(GameBoard).toHaveBeenCalledTimes(1); // Ensure GameBoard constructor is called once
  });

  it('should initialize with turn set to true', () => {
    expect(player.turn).toBe(true);
  });
});

