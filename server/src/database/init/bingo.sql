-- Table des utilisateurs --
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  token TEXT NULL
);

-- Table des cartons --
CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  nums TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Table des parties --
CREATE TABLE IF NOT EXISTS parties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  winner INTEGER NOT NULL,
  name TEXT NOT NULL,
  max_cards_by_player INTEGER NOT NULL,
  max_players INTEGER NOT NULL,
  value_card INTEGER NOT NULL,
  steps TEXT NOT NULL,
  prizes TEXT NOT NULL,
  is_private INTEGER NOT NULL,
  status TEXT NOT NULL,
  numbers_called TEXT NOT NULL,
  host TEXT NOT NULL,
  FOREIGN KEY (winner) REFERENCES users (id)
);

-- Table des participants --
CREATE TABLE IF NOT EXISTS participants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  party_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (party_id) REFERENCES parties (id)
);