### Prerequisites

Before starting you have to meet the following requirements:

Node Version `10.136.1` is recommended.
NPM Version `6.9.0`is recommended

And install node dependencies

```shell
npm i
cd src/
```

IMPORTANT!: To execute all exercises you have to be in the src directory.
# Exercise 1:

Write an efficient algorithm to check if a string is a palindrome. A string is a palindrome if the string matches the reverse of string.

To execute this exercise through the console, it is necessary to enter the following command:

```shell
node indexPalindrome.js -s "ana"
```
# Exercise 2:

Write an efficient algorithm to find K-complementary pairs in a given array of integers. Given Array A, pair (i, j) is K- complementary if K = A[i] + A[j];

To execute this exercise through the console, it is necessary to enter the following command:

```shell
node indexKComplementary.js -a 1 2 3 4 5 6 7 -k 7
```
a --> array of number separated by commas

# Utils test
You can run happy path test: isPalindrome and isKComplementary modules implemented by mochaJs.

```shell
npm run test
```

# Exercise 3:

Tf/idf (term frequency / inverse document frequency) is an statistic that reflects the importance of a term T
in a document D (or the relevance of a document for a searched term) relative to a document set S.

To execute this exercise through the console, it is necessary to enter the following command:

```shell
node  tfIdf.js -d samples -n 6 -p 3000 -t "la agua el mujer cabello"
```