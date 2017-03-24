var generateButton;
var wordAmount;
var output;

document.addEventListener("DOMContentLoaded", function(e) {
    generateButton = document.getElementById("generate");
    wordAmount = document.getElementById("word-amount");output = document.getElementById("output");
    generateButton.addEventListener("click", generatePassphrase );
});

function generateDiceRoll() {
    return Math.floor(Math.random() * (6 - 1) + 1);
}

function generateDicewareID() {
    var dicewareID = "";
    var currentDiceroll;
    for (var i = 0; i < 5; i++) {
        currentDiceroll = generateDiceRoll();
        dicewareID += "" + currentDiceroll;
    }
    return parseInt(dicewareID);
}

function generatePassphrase() {
    var amount = wordAmount.value;
    if ( typeof amount == "undefined" || amount <= 0 ) return;
    var passphraseWordIDs = [];
    var passphraseWords = [];

    for (var i = 0; i < amount; i++) {
        passphraseWordIDs.push( generateDicewareID());
    }

    passphraseWordIDs.forEach(function ( passwordID ) {
        var passphraseWord = findWordWithDicewareID( passwordID, dicewareList );
        passphraseWords.push(passphraseWord);
    });

    generateOutput( passphraseWordIDs, passphraseWords );
}

function slowGeneratePassphrase() {
    var amount = wordAmount.value;
    if ( typeof amount == "undefined" || amount <= 0 ) return;
    var passphraseWordIDs = [];
    var passphraseWords = [];
    for (var i = 0; i < amount; i++) {
        passphraseWordIDs.push( generateDicewareID());
    }

    generateOutput( passphraseWordIDs, passphraseWords );
}

function findWordWithDicewareID( dicewareID, dicewareList, iterations ) {
    var i = Math.floor(( dicewareList.length) /2 );
    var currentID = dicewareList[i].key;
    var slicedDicewareList;

    if ( currentID <  dicewareID ) {
        slicedDicewareList = dicewareList.slice(i, dicewareList.length);
        return findWordWithDicewareID( dicewareID, slicedDicewareList )
    } else if ( currentID >  dicewareID ) {
        slicedDicewareList = dicewareList.slice(0, i);
        return findWordWithDicewareID( dicewareID, slicedDicewareList )
    } else {
        return dicewareList[i].value;
    }
}

function generateOutput( passphraseWordIDs, passphraseWords ) {
    output.innerHTML = "";
    var length = passphraseWordIDs.length;
    var i = 0;
    var passphrase = "";
    for(;i < length; i++) {
        output.innerHTML += passphraseWordIDs[i] + " : " + passphraseWords[i] + "\r\n";
        passphrase += passphraseWords[i] + " ";
    }

    passphrase = passphrase.substr(0,passphrase.length - 1 );

    output.innerHTML += "Your passphrase is : \"" + passphrase + "\"";
}