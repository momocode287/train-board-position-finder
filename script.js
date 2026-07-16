document.getElementById("searchButton").addEventListener("click", function(){

    const station = document.getElementById("station").value;
    const line = document.getElementById("line").value;
    const direction = document.getElementById("direction").value;

    if (!station) {
        document.getElementById("result").innerHTML =
            "<p>駅を選択してください。</p>";
        return;    
    }

    if (!line) {
        document.getElementById("result").innerHTML =
            "<p>路線を選択してください。</p>";
        return;  
    }

    if (!direction) {
        document.getElementById("result").innerHTML =
            "<p>方面を選択してください。</p>";

        return;    
    }

    const selectedPriority = document.querySelector('input[name = "priority"]:checked');

    if (!selectedPriority) {
       document.getElementById("result").innerHTML =
           "<p>優先したい項目を選択してください。</p>";
       return;
    }

    const priority = selectedPriority.value;

    console.log(station);
    console.log(line);
    console.log(direction);
    console.log(priority);


fetch("./train_data.csv")
.then(response => response.text())
.then(data => {
  
    const rows = data.trim().split(/\r?\n/);

    console.log("rows:", rows.length);

    const headers = rows[0].split(",");

    console.log(headers);

const results = rows.filter(row => {
     const columns = row.split(",");

     console.log("CSV:", columns[1], columns[3], colimns[4]);
     console.log("選択:", station, line, direction);

     return (
        columns[1] === station &&
        columns[3] === line &&
        columns[4] === direction
     );
});

console.log("results:", results.length);

const best = results.filter(row => {
    const columns = row.split(",");

    if (priority === "階段") {
        return columns[8] === "◎";
    }

    if (priority === "エスカレーター") {
        return columns[9] === "◎";
    }

    if (priority === "エレベーター") {
        return columns[10] === "◎";
    }

    return true;
});

console.log(best);

console.log(best.length);

if (best.length > 0) {
   
    const columns = best[0].split(",");
  
    console.log(columns);

    const car = columns[7];
    const gate = columns[11];
    const exit = columns[12];
    const transfer = columns[13];
    const type = columns[14];
    const note = columns[15];

    console.log(car);
    console.log(gate);
    console.log(exit);
    console.log(transfer);
    console.log(type);
    console.log(note);

    document.getElementById("result").innerHTML = `
    
    <h3>おすすめ号車</h3>
    <p>${car}</p>

   <h3>車両種別</h3>
   <p>${type}</p>

   <h3>近い改札</h3>
   <p>${gate}</p>

    <h3>近い出口</h3>
    <p>${exit}</p>
    
    <h3>乗り換え先</h3>
    <p>${transfer}</p>

    ${note ? ` <h3>注意事項</h3><p>${note}</p>` : ""}
    
    `;
} else {

    document.getElementById("result").innerHTML =
    "<p>該当するデータが見つかりませんでした。</p>";
 }


})
.catch(error => {
    console.error(error);

    document.getElementById("result").innerHTML =
    "<p>データの読み込みに失敗しました。</p><p>" + error.message + "</p>";
    

});

});

