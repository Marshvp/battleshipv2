/**
 * @jest-environment jsdom
 */

import handleAttack from '../src/index'; // Adjust path as needed

// Mocking the game setup and defining it globally
global.game = {
  player1Instance: {
    name: "player1",
    turn: true,
    board: {
      receiveAttack: jest.fn() // Mock function to simulate attack response
    }
  },
  player2Instance: {
    name: "player2",
    turn: false,
    board: {
      receiveAttack: jest.fn()
    }
  }
};

// Mock DOM elements
beforeEach(() => {
  document.body.innerHTML = `
    <div id="combatLog">
    </div>
    <div id="player1-0-0" data-player="player1"></div>
    <div id="player2-0-0" data-player="player2"></div>
  `;

  // Reset the mocks before each test
  game.player1Instance.board.receiveAttack.mockClear();
  game.player2Instance.board.receiveAttack.mockClear();
});

// Mock `handleAttack` to have access to the `game` object through the global scope
function handleAttackWrapper(x, y, cell) {
  handleAttack(x, y, cell); // No need to pass `game` here since it's globally available
}

describe('handleAttack', () => {
  it('should log hit for a valid attack', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;
    game.player2Instance.board.receiveAttack.mockReturnValueOnce('hit');

    const cell = document.getElementById('player2-0-0');
    handleAttackWrapper(0, 0, cell);

    expect(cell.classList.contains('hit')).toBe(true);
    expect(document.getElementById('combatLog').children.length).toBe(1);
    expect(document.getElementById('combatLog').lastChild.textContent).toContain('Hit at 0-0 by player1');
  });

  it('should log miss for a valid attack', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;
    game.player2Instance.board.receiveAttack.mockReturnValueOnce('miss');

    const cell = document.getElementById('player2-0-0');
    handleAttackWrapper(0, 0, cell);

    expect(cell.classList.contains('miss')).toBe(true);
    expect(document.getElementById('combatLog').children.length).toBe(1);
    expect(document.getElementById('combatLog').lastChild.textContent).toContain('Miss at 0-0 by player1');
  });

  it('should prevent attacking your own board', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;

    const cell = document.getElementById('player1-0-0'); // Player1 trying to attack their own board
    handleAttackWrapper(0, 0, cell);

    expect(game.player2Instance.board.receiveAttack).not.toHaveBeenCalled();
    expect(document.getElementById('combatLog').children.length).toBe(0);
  });

  it('should switch turns after a hit', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;
    game.player2Instance.board.receiveAttack.mockReturnValueOnce('hit');

    const cell = document.getElementById('player2-0-0');
    handleAttackWrapper(0, 0, cell);

    expect(game.player1Instance.turn).toBe(false);
    expect(game.player2Instance.turn).toBe(true);
  });

  it('should switch turns after a miss', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;
    game.player2Instance.board.receiveAttack.mockReturnValueOnce('miss');

    const cell = document.getElementById('player2-0-0');
    handleAttackWrapper(0, 0, cell);

    expect(game.player1Instance.turn).toBe(false);
    expect(game.player2Instance.turn).toBe(true);
  });

  it('should not switch turns if attacking the same cell again and result is "again"', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;
    game.player2Instance.board.receiveAttack.mockReturnValueOnce('again');

    const cell = document.getElementById('player2-0-0');
    handleAttackWrapper(0, 0, cell);

    // Turns should not switch
    expect(game.player1Instance.turn).toBe(true);
    expect(game.player2Instance.turn).toBe(false);
    // No new combat log entry should be created
    expect(document.getElementById('combatLog').children.length).toBe(0);
  });

  it('should correctly update the combat log for multiple hits and misses', () => {
    game.player1Instance.turn = true;
    game.player2Instance.turn = false;

    // First attack is a hit
    game.player2Instance.board.receiveAttack.mockReturnValueOnce('hit');
    const cell1 = document.getElementById('player2-0-0');
    handleAttackWrapper(0, 0, cell1);

    // Second attack is a miss
    game.player1Instance.turn = false;
    game.player2Instance.turn = true;
    game.player1Instance.board.receiveAttack.mockReturnValueOnce('miss');
    const cell2 = document.getElementById('player1-0-0');
    handleAttackWrapper(0, 0, cell2);

    const combatLog = document.getElementById('combatLog');
    expect(combatLog.children.length).toBe(2);
    expect(combatLog.children[0].textContent).toContain('Hit at 0-0 by player1');
    expect(combatLog.children[1].textContent).toContain('Miss at 0-0 by player2');
  });
});
