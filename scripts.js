// var darkMode = false;
var puzzles = ["267442244599857158429549425882[5]62325", "68685632836341875337717598489[5]589827", "647847961578356[6]39552463435285741374", "976126724964[7]99664739384845822138342", "2727688446134389[6]8429687823767358298", "398[6]71639558623368229643743265648899", "92515899792726855313[5]534362782359756", "329649985863496358[5]14729879379228353", "795586455[6]65373494194356532682836159", "642359538441173319[1]24587358731931636", "568769846459826867373[6]76136585727682", "489954386525861613629464454[1]57976863"];

var lightred = "rgb(222, 95, 95)";

var key;

var inputList = document.getElementsByTagName('input');
var arr = new Array(36);
for (let i=0; i<36; i++) {
    arr[i] = inputList[i];
}

var currentPuzzle = -1;
nextPuzzle();

function toggle() {
    var color = event.target.style.backgroundColor;
    if (color == "") {
        event.target.style.backgroundColor = "gray";
    } else if (color == "gray") {
        event.target.style.backgroundColor = "lightgreen";
        // check(event.target);
    } else {
        event.target.style.backgroundColor = "";
    }
    check(event.target);
}

function enable() {
    for (let i=0; i<inputList.length-1; i++) {
        inputList[i].disabled = false;
    }
}

function disable() {
    for (let i=0; i<inputList.length-1; i++) {
        inputList[i].disabled = true;
    }
}

function fillFromBox() {
    var nums = document.getElementById('fillBox').value;
    fill(nums, "X", "UserInput");
}

function fill(nums, name, creator) {
    reset();

    var listIndex = 0;

    if (key != null) {
        document.getElementsByTagName('div')[key].setAttribute("onclick", "toggle()");
        key -= parseInt(key/6) + 1;

        // bug: keys for odd puzzles 5 and after are 1 too large
        if (currentPuzzle+1 > 4) {
            if ((currentPuzzle+1) % 2 != 0) {
                key--; // temp fix
            }
        }
        inputList[key].style.backgroundColor = "";
    }

    for (let i=0; i<nums.length; i++) {
        if (nums.charAt(i) == '[') {
            i++;
            inputList[listIndex].value = nums.charAt(i);
            inputList[listIndex].style.backgroundColor = "gold";
            key = parseInt(listIndex + listIndex/6 + 2);
            document.getElementsByTagName('div')[key].onclick="";
            i++;
        } else {
            inputList[listIndex].value = nums.charAt(i);
        }
        listIndex++;
    }
    disable();
    document.getElementById('puzzleNum').innerHTML = name;
    document.getElementById('creator').innerHTML = creator;
}

function check(target) {
    // 0  1  2  3  4  5
    // 6  7  8  9  10 11
    // 12 13 14 15 16 17
    // 18 19 20 21 22 23
    // 24 25 26 27 28 29
    // 30 31 32 33 34 35

    var item = getIndex(target);
    var focus = inputList[item];

    var sum = 0;
    var column = new Array();

    // above
    var index = item - 6;
    while (index >= 0) {
        var compare = inputList[index];
        if (compare.style.backgroundColor == "lightgreen" || compare.style.backgroundColor == "gold") {
            sum += parseInt(compare.value);
            column.push(parseInt(index));
        }
        index -= 6;
    }

    // below
    index = item + 6;
    while (index < 36) {
        var compare = inputList[index];
        if (compare.style.backgroundColor == "lightgreen" || compare.style.backgroundColor == "gold") {
            sum += parseInt(compare.value);
            column.push(index);
        }
        index += 6;
    }

    if (focus.style.backgroundColor == "lightgreen" || focus.style.backgroundColor == "gold") {
        sum += parseInt(focus.value);
        column.push(item);
        if (sum > 9) {
            redBorderOn(column);
        }
    } else if (sum <= 9) {
        column.push(item);
        redBorderOff(column);
    }

    sum = 0;
    var row = new Array();

    // left
    index = item - 1;
    var mod = item % 6;

    while (mod > 0) {
        var compare = inputList[index];
        if(compare.style.backgroundColor == "lightgreen" || compare.style.backgroundColor == "gold") {
            sum += parseInt(compare.value);
            row.push(parseInt(index));
        }
        mod--;
        index--;
    }

    // right
    index = item + 1;
    mod = 5 - (item % 6);

    while (mod > 0) {
        var compare = inputList[index];
        if (compare.style.backgroundColor == "lightgreen" || compare.style.backgroundColor == "gold") {
            sum += parseInt(compare.value);
            row.push(parseInt(index));
        }
        mod--;
        index++;
    }

    if (focus.style.backgroundColor == "lightgreen" || focus.style.backgroundColor == "gold") {
        sum += parseInt(focus.value);
        row.push(item);
        if (sum > 9) {
            redBorderOn(row);
        }
    } else if (sum <= 9) {
        row.push(item);
        redBorderOff(row);
    }
}

function getIndex(target) {
    for (let i=0; i<arr.length; i++) {
        if (target === arr[i]) return i;
    }
    return -1;
}

function redBorderOn(arr) {
    for (let i=0; i < arr.length; i++) {
        inputList[arr[i]].style.borderColor = lightred;
    }
}

function redBorderOff(arr) {
    for (let i=0; i < arr.length; i++) {
        inputList[arr[i]].style.borderColor = "gray";
    }
}

function reset() {
    for (let i=0; i < 36; i++) {
        if (inputList[i].style.backgroundColor != "gold") {
            inputList[i].style.backgroundColor = "";
            inputList[i].style.borderColor = "gray";
        }
    }
}

function nextPuzzle() {
    if (currentPuzzle + 1 >= puzzles.length) {
        currentPuzzle = 0;
    } else {
        currentPuzzle++;
    }

    if (currentPuzzle == 9) {
        fill(puzzles[currentPuzzle], currentPuzzle + 1,
            '<a href="https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?chlang=en&id=0003R6" target="_blank">Rotstein (Logic Masters Germany)</a>');
    } else {
        fill(puzzles[currentPuzzle], currentPuzzle + 1, '<a href="https://www.brainzilla.com/logic/kyudoku/" target="_blank">Brainzilla</a>');
    }

}

// function toggleColor() {
//     if (darkMode) {
//         document.body.className = "lightMode";
//         document.getElementsByTagName('button')[0].innerHTML = "change to dark mode";
//     } else {
//         document.body.className = "darkMode";
//         document.getElementsByTagName('button')[0].innerHTML = "change to light mode";
//     }
// }
