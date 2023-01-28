#include <iostream>
#include <stdlib.h>
#include <cstdlib>
#include <ctime>
#include <conio.h>
#include <functional>
#include "project.h"

using namespace std;


void drawWalls(Map& matrix, int num_innerWalls) {
	Wall* walls = new Wall[(matrix.width + matrix.height) * 2 - 4 + num_innerWalls];
	int index = 0;

	for (int i = 0; i < matrix.width; i++) {
		walls[index] = Wall(0, i);
		matrix.add(walls[index]);
		index++;
		walls[index] = Wall(matrix.height - 1, i);
		matrix.add(walls[index]);
		index++;
	}
	for (int j = 1; j < matrix.height - 1; j++) {
		walls[index] = Wall(j, 0);
		matrix.add(walls[index]);
		index++;
		walls[index] = Wall(j, matrix.width - 1);
		matrix.add(walls[index]);
		index++;
	}
	for (int k = 0; k < num_innerWalls; k++) {
		int heightInner = (rand() % (matrix.height - 2)) + 1;
		int widthInner = (rand() % (matrix.width - 2)) + 1;

		while (matrix.getValue(heightInner, widthInner) != 0) {
			heightInner = (rand() % (matrix.height - 2)) + 1;
			widthInner = (rand() % (matrix.width - 2)) + 1;
		}
		walls[index] = Wall(heightInner, widthInner);
		matrix.add(walls[index]);
		index++;
	}
	delete[] walls;
}

void generateGems(Map& matrix, int num_gems) {
	Gem* gems = new Gem[num_gems];
	int index = 0;

	for (int i = 0; i < num_gems; i++) {
		int heightGem = (rand() % (matrix.height - 2)) + 1;
		int widthGem = (rand() % (matrix.width - 2)) + 1;

		while (matrix.getValue(heightGem, widthGem) != 0) {
			heightGem = (rand() % (matrix.height - 2)) + 1;
			widthGem = (rand() % (matrix.width - 2)) + 1;
		}
		gems[index] = Gem(heightGem, widthGem);
		matrix.add(gems[index]);
		index++;
	}
	delete[] gems;
}

void generateApples(Map& matrix, int num_apples) {
	Apple* apples = new Apple[num_apples];
	int index = 0;

	for (int i = 0; i < num_apples; i++) {
		int heightApple = (rand() % (matrix.height - 2)) + 1;
		int widthApple = (rand() % (matrix.width - 2)) + 1;
		while (matrix.getValue(heightApple, widthApple) != 0) {
			heightApple = (rand() % (matrix.height - 2)) + 1;
			widthApple = (rand() % (matrix.width - 2)) + 1;
		}
		apples[index] = Apple(heightApple, widthApple);
		matrix.add(apples[index]);
		index++;
	}
	delete[] apples;
}

void generateMonsters(Map& matrix, int num_monsters) {
	Monster* monsters = new Monster[num_monsters];
	int index = 0;

	for (int i = 0; i < num_monsters; i++) {
		int heightMonster = (rand() % (matrix.height - 2)) + 1;
		int widthMonster = (rand() % (matrix.width - 2)) + 1;

		while (matrix.getValue(heightMonster, widthMonster) != 0) {
			heightMonster = (rand() % (matrix.height - 2)) + 1;
			widthMonster = (rand() % (matrix.width - 2)) + 1;
		}
		monsters[index] = Monster(heightMonster, widthMonster);
		matrix.add(monsters[index]);
		index++;
	}
	delete[] monsters;
}



bool gameplay(GameConfig config, int& point) {
	Map matrix = Map(config.height, config.width, config.num_gems, config.num_apples, config.num_monsters, config.num_innerWalls);
	Player player(4, 6, 100);
	SecretPassage passage(config.passage_x, config.passage_y);
	int num_gems = config.num_gems;
	matrix.add(player);
	matrix.add(passage);
	matrix.add(Wall(0, 0));
	drawWalls(matrix, config.num_innerWalls);
	generateGems(matrix, config.num_gems);
	generateApples(matrix, config.num_apples);
	generateMonsters(matrix, config.num_monsters);


	player.addEventTakeGem([&]() {
		num_gems--;
		matrix.num_gems = num_gems;
		point = point + 100;
		});

	player.addEventKillMonster([&]() {
		point = point + 300;
		});

	bool run = true;
	while (run) {
		system("CLS");
		cout << "Welcome to the Treasure Hunt!" << endl;
		cout << "Entered to the magical dungeon. Good luck!" << endl;
		cout << "Level: " << config.level << endl;
		cout << "Number of gems: " << num_gems << endl;

		if (player.getEnergy() > 0) {
			cout << "Player Energy: " << player.getEnergy() << "%; Points: " << point << endl;
		}
		else {
			return false;
		}

		if (num_gems == 0) {
			matrix.add(passage);
			cout << "All gems are collected from the cave, a secret doorway is opened." << endl;
		}

		player.move(matrix);

		if (num_gems == 0 && player.getXPosition() == passage.getX() && player.getYPosition() == passage.getY()) {
			run = false;
			return true;
		}

	}
}

int main() {
	int point = 0;
	bool win = false;
	srand(time(NULL));
	GameConfig configs[2] = { GameConfig(8,10,5,5,6,3,3,3,1), GameConfig(10,12,7,7,8,5,3,3,2) };

	for (GameConfig config : configs) {
		win = gameplay(config, point);
		if (win == false) {
			break;
		}
	}

	if (win) {
		system("CLS");
		cout << "Congratulation!" << endl;
		cout << "High score: " << point << endl;
	}

	else {
		system("CLS");
		cout << "Good luck next time!" << endl;
		cout << "High score: " << point << endl;
	}

	return 0;
}
