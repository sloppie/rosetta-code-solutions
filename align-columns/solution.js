const testArr = [
  'Given$a$text$file$of$many$lines',
  'where$fields$within$a$line$',
  'are$delineated$by$a$single$"dollar"$character',
  'write$a$program',
  'that$aligns$each$column$of$fields$',
  'by$ensuring$that$words$in$each$',
  'column$are$separated$by$at$least$one$space.',
  'Further,$allow$for$each$word$in$a$column$to$be$either$left$',
  'justified,$right$justified',
  'or$center$justified$within$its$column.'
];


// hold the each row represented in the array
// the Row class (Object)
function Row(str) {
  this.oString = str;
  this.splitStr = str.split("$");
  // records the word length to help align
  this.wordsLength = this.splitStr.map(word => {
    return word.length;
  });
}

Row.prototype.getWordLengthAt = function(index) {
  return this.wordsLength[index];
}

Row.prototype.getWordAt = function(index) {
  return this.splitStr[index];
}

/**
 * This class takes in the string that are seperated by the '$' and reformats
 * them into the wanted order `( "left" | "center" | "right")`
 * @class
 * @param {Array<string>} rows an array of strings representing each line in
 *    the Rosetta string
 */
function Rows(/**@type Array<string>*/rows) {
  this.rows = rows.map(row => new Row(row));
  this.maxSentenceSize = 0;
  // set the maxSentenceSize
  this.rows.forEach(row => {
    if (this.maxSentenceSize == 0)
      this.maxSentenceSize = row.splitStr.length;
    else {
      if (this.maxSentenceSize < row.splitStr.length)
        this.maxSentenceSize = row.splitStr.length;
    }
  });

  // console.log(`Max sentence size: ${this.maxSentenceSize}`);

  this.maxWordSizePerColumn = [];
  // init the Array to zero
  for(let i=0; i<this.maxSentenceSize; i++) {
    this.maxWordSizePerColumn.push(0);
  }

  // find the maxSize at each column
  this.rows.forEach(row => {
    row.splitStr.forEach((word, index) => {
      if(this.maxWordSizePerColumn[index] < word.length) {
        this.maxWordSizePerColumn[index] = word.length
      }
    });
  });
}

Rows.prototype.leftAlign = function() {
  let sentences = [];
  this.rows.forEach(words => {
    let sentence = ""; 
    words.splitStr.forEach((word, index) => {
      let extraSpace = this.maxWordSizePerColumn[index] - word.length;
      let newWord = "";

      // insert whitespace before the word begins
      for(let i=0; i<extraSpace; i++) {
        newWord += " ";
      }

      newWord += word;

      if(sentence)
        sentence += `${newWord}`;
      else
        sentence += newWord;
    });

    // console.log(sentence);
    // the new aligned sentence
    sentences.push(sentence);
  });

  console.log(sentences.join("\n"));
  return sentences.join("\n");
}

Rows.prototype.rightAlign = function() {}

Rows.prototype.centerAlign = function() {}


function formatText(input, justification) {

  return new Rows(input).leftAlign();
}
