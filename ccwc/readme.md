# Write your own wc tool
An attempt at writing a rebuilding wc cli tool based on specs here: https://codingchallenges.fyi/challenges/challenge-wc

### How to run
1. Clone repo
2. cd into ccwc
3. run npm i -g .
4. Run supported commands

### Commands
Commands need to be in the following format: `ccwc <operation> <filename>`, the currently supported operations are:
* `-c` Counts the number of bytes in the file
* `-l` Counts the number of lines in the file
* `-w` COunts the number of words in the file
* `-m` Counts the number of characters in the file
