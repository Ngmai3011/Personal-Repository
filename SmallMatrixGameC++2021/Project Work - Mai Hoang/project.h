#include <iostream>
#include <stdlib.h>
#include <cstdlib>
#include <ctime>
#include <conio.h>
#include <functional>

using namespace std;
class GameObject {
private:
	int x;
	int y;
	int type;

public:
	void setX(int x) {
		this->x = x;
	}
	int getX() {
		return x;
	}
	void setY(int y) {
		this->y = y;
	}
	void setType() {
		this->type = type;
	}
	int getType() {
		return type;
	}
	int getY() {
		return y;
	}

	GameObject() { }

	GameObject(int x, int y, int type) {
		this->x = x;
		this->y = y;
		this->type = type;
	}
	//Destructor
	~GameObject() { }
};

class Map {
private:
	int** map;

public:
	int height;
	int width;
	int num_gems;
	int num_apples;
	int num_monsters;
	int num_innerWalls;

	Map(int height, int width, int num_gems, int num_apples, int num_monsters, int num_innerWalls) {
		this->height = height;
		this->width = width;
		this->num_gems = num_gems;
		this->num_apples = num_apples;
		this->num_monsters = num_monsters;
		this->num_innerWalls = num_innerWalls;

		this->map = new int* [height];

		for (int i = 0; i < height; i++) {
			map[i] = new int[width];
		}

		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				map[i][j] = 0;
			}

		}
	}

	void print() {
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				if (map[i][j] == -1) {
					cout << "X";
				}
				else if (map[i][j] == 0) {
					cout << ".";
				}
				else if (map[i][j] == 1) {
					cout << "@";
				}
				else if (map[i][j] == 2) {
					cout << "$";
				}
				else if (map[i][j] == 3) {
					cout << "a";
				}
				else if (map[i][j] == 4) {
					cout << "m";
				}
				else if (map[i][j] == 5 && num_gems == 0) {
					cout << "E";
				}
				else if (map[i][j] == 5 && num_gems != 0) {
					cout << ".";
				}

			}
			cout << endl;
		}
	}

	void setValue(int x, int y, int value) {
		map[x][y] = value;
	}

	int getValue(int x, int y) {
		return map[x][y];
	}

	void add(GameObject obj) {
		map[obj.getX()][obj.getY()] = obj.getType();
	}

	~Map() {
		for (int i = 0; i < height; i++) {
			delete[] map[i];
		}
		delete[] map;
	}
};

class GameConfig {
public:
	int level;
	int height;
	int width;
	int num_innerWalls;
	int num_gems;
	int num_apples;
	int num_monsters;
	int passage_x;
	int passage_y;

	GameConfig(int height, int width, int num_innerWalls, int num_gems, int num_apples, int num_monsters, int passage_x, int passage_y, int level) {
		this->height = height;
		this->width = width;
		this->num_innerWalls = num_innerWalls;
		this->num_apples = num_apples;
		this->num_gems = num_gems;
		this->num_monsters = num_monsters;
		this->passage_x = passage_x;
		this->passage_y = passage_y;
		this->level = level;
	}
};


class Wall : public GameObject {
private:
	int x;
	int y;
public:
	Wall() { }

	Wall(int x, int y) : GameObject(x, y, -1) {
		this->x = x;
		this->y = y;
	}
};

class Gem : public GameObject {
private:
	int x;
	int y;
public:
	Gem() { }
	void setXPosition(int x) {
		this->x = x;
	}
	int getXPosition() {
		return x;
	}

	void setYPosition(int y) {
		this->y = y;
	}
	int getYPosition() {
		return y;
	}

	Gem(int x, int y) : GameObject(x, y, 2) {
		this->x = x;
		this->y = y;
	}

};

class Apple : public GameObject {
private:
	int x;
	int y;
public:
	Apple() { }

	Apple(int x, int y) : GameObject(x, y, 3) {
		this->x = x;
		this->y = y;
	}
};

class Monster : public GameObject {
private:
	int x;
	int y;
public:
	Monster() { }
	Monster(int x, int y) : GameObject(x, y, 4) {
		this->x = x;
		this->y = y;
	}
};

class SecretPassage : public GameObject {
private:
	int x;
	int y;
public:
	SecretPassage() { }
	SecretPassage(int x, int y) : GameObject(x, y, 5) {
		this->x = x;
		this->y = y;
	}
};

class Player : public GameObject {
private:
	int x;
	int y;
	int energy;
	std::function<void()>(onTakeGem);
	std::function<void()>(onKillMonster);
	std::function<void()>(onKilled);

public:
	void addEventTakeGem(std::function<void()> callback) {
		this->onTakeGem = callback;
	}

	void addEventKillMonster(std::function<void()> callback) {
		this->onKillMonster = callback;
	}
	void addEventKilled(std::function<void()> callback) {
		this->onKilled = callback;
	}

	void setEnergy(int energy) {
		this->energy = energy;
	}
	int getEnergy() {
		return energy;
	}

	void setXPosition(int x) {
		this->x = x;
	}
	int getXPosition() {
		return x;
	}

	void setYPosition(int y) {
		this->y = y;
	}
	int getYPosition() {
		return y;
	}

	Player(int x, int y, int energy) : GameObject(x, y, 1) {
		this->x = x;
		this->y = y;
		this->energy = energy;
	}

	void move(Map& map) {

		map.print();
		cout << "Please select action: ";
		char choice = _getch();

		switch (choice) {
		case 'w':
		case 'W':
			if (map.getValue(x - 1, y) == -1) {
				break;
			}
			else if (map.getValue(x - 1, y) == 2) {
				map.setValue(x, y, 0);
				map.setValue(x - 1, y, this->getType());
				x = x - 1;
				setEnergy(energy - 5);
				this->onTakeGem();
				break;
			}

			else if (map.getValue(x - 1, y) == 3) {
				map.setValue(x, y, 0);
				map.setValue(x - 1, y, this->getType());
				x = x - 1;
				if (energy < 81) {
					setEnergy(energy + 20);
				}
				else {
					setEnergy(100);
				}
				break;
			}

			else if (map.getValue(x - 1, y) == 4) {
				if (energy < 50) {
					setEnergy(0);
				}
				else {
					map.setValue(x, y, 0);
					map.setValue(x - 1, y, this->getType());
					x = x - 1;
					setEnergy(energy - 20);
					this->onKillMonster();
				}
				break;
			}
			map.setValue(x, y, 0);
			map.setValue(x - 1, y, this->getType());
			x = x - 1;
			setEnergy(energy - 5);
			break;

		case 'a':
		case 'A':
			if (map.getValue(x, y - 1) == -1) {
				break;
			}
			else if (map.getValue(x, y - 1) == 2) {
				map.setValue(x, y, 0);
				map.setValue(x, y - 1, this->getType());
				y = y - 1;
				setEnergy(energy - 5);
				this->onTakeGem();
				break;
			}
			else if (map.getValue(x, y - 1) == 3) {
				map.setValue(x, y, 0);
				map.setValue(x, y - 1, this->getType());
				y = y - 1;
				if (energy < 81) {
					setEnergy(energy + 20);
				}
				else {
					setEnergy(100);
				}
				break;
			}
			else if (map.getValue(x, y - 1) == 4) {
				if (energy < 50) {
					setEnergy(0);
				}
				else {
					map.setValue(x, y, 0);
					map.setValue(x, y - 1, this->getType());
					y = y - 1;
					setEnergy(energy - 15);
					this->onKillMonster();
				}
				break;
			}
			map.setValue(x, y, 0);
			map.setValue(x, y - 1, this->getType());
			y = y - 1;
			setEnergy(energy - 5);
			break;

		case 's':
		case 'S':
			if (map.getValue(x + 1, y) == -1) {
				break;
			}
			else if (map.getValue(x + 1, y) == 2) {
				map.setValue(x, y, 0);
				map.setValue(x + 1, y, this->getType());
				x = x + 1;
				setEnergy(energy - 5);
				this->onTakeGem();
				break;
			}
			else if (map.getValue(x + 1, y) == 3) {
				map.setValue(x, y, 0);
				map.setValue(x + 1, y, this->getType());
				x = x + 1;
				if (energy < 81) {
					setEnergy(energy + 15);
				}
				else {
					setEnergy(100);
				}
				break;
			}
			else if (map.getValue(x + 1, y) == 4) {
				if (energy < 50) {
					setEnergy(0);
				}
				else {
					map.setValue(x, y, 0);
					map.setValue(x + 1, y, this->getType());
					x = x + 1;
					setEnergy(energy - 15);
					this->onKillMonster();
				}
				break;
			}
			map.setValue(x, y, 0);
			map.setValue(x + 1, y, this->getType());
			x = x + 1;
			setEnergy(energy - 5);
			break;

		case 'd':
		case 'D':
			if (map.getValue(x, y + 1) == -1) {
				break;
			}
			else if (map.getValue(x, y + 1) == 2) {
				map.setValue(x, y, 0);
				map.setValue(x, y + 1, this->getType());
				y = y + 1;
				setEnergy(energy - 5);
				this->onTakeGem();
				break;
			}
			else if (map.getValue(x, y + 1) == 3) {
				map.setValue(x, y, 0);
				map.setValue(x, y + 1, this->getType());
				y = y + 1;
				if (energy < 81) {
					setEnergy(energy + 20);
				}
				else {
					setEnergy(100);
				}
				break;
			}
			else if (map.getValue(x, y + 1) == 4) {
				if (energy < 50) {
					setEnergy(0);
				}
				else {
					map.setValue(x, y, 0);
					map.setValue(x, y + 1, this->getType());
					y = y + 1;
					setEnergy(energy - 15);
					this->onKillMonster();
				}
				break;
			}
			map.setValue(x, y, 0);
			map.setValue(x, y + 1, this->getType());
			y = y + 1;
			setEnergy(energy - 5);
			break;
		case 'q':
		case 'Q':
			exit(0);
		default:
			break;
		}
	}

};