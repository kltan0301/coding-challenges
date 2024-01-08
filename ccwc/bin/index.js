#! /usr/bin/env node
const fs = require('node:fs');

const FILE_REGEX = /[\w|\d]+\.[\w]+/;
const OPERATION_REGEX = /-[\w]/;

const calculateBytes = (data) => {
  return new Blob([data]).size
}

const calculateLines = (data) => {
  let count = 0;
  for(let i = 0; i < data.length; i++) {
    if (['\n', '\r\n'].includes(data[i])) {
      count++;
    }
  }
  return count;
}

const calculateWords = (data) => {
  let count = 0;
  const lines = data.split(/\n/);
  for(let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    count += line.split(' ').length;
  }
  return count;
}

const calculateCharacters = (data) => {
  let count = 0;
  for(let i = 0; i < data.length; i++) {
    count++;
  }
  return count;
}

const processOption = (option, data) => {
  switch(option) {
    case '-c':
      return calculateBytes(data);
    case '-l':
      return calculateLines(data);
    case '-w':
      return calculateWords(data);
    case '-m':
      return calculateCharacters(data);
    default:
      return `${calculateLines(data)} ${calculateWords(data)} ${calculateBytes(data)}`
  }
}

async function read() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

class CliArguments {
  constructor(argumentArray) {
    this.argumentArray = argumentArray;
  }

  get fileName() {
    return this.argumentArray.find((arg) => arg.match(FILE_REGEX));
  }

  get option() {
    return this.argumentArray.find(arg => arg.match(OPERATION_REGEX));
  }
}
const main = async () => {
  const args = process.argv;
  const commandArguments = new CliArguments(args.slice(2, args.length));
  if (commandArguments.fileName) {
    const fileName = commandArguments.fileName;
    const option = commandArguments.option;
    const data = fs.readFileSync(fileName, 'utf-8');
    console.log(`${processOption(option, data)} ${fileName}`);
  } else {
    const data = await read();
    console.log(`${processOption(commandArguments.option, data)}`);
  }
}

main();
