let tBody = document.getElementById('tBody');
let table = document.getElementById('table');
let inpForm = document.getElementById('inpForm');
function addElem(elem) {
    let row = elem.parentNode.parentNode;
    let tableItem = row.children[1].children[0].value
    let tablePurity = row.children[2].children[0].value
    let tableWtGm = row.children[3].children[0].value
    let tableWtMg = row.children[4].children[0].value
    let tableAmount = row.children[5].children[0].value
    let tableMakingCharges = row.children[6].children[0].value
    tBody.innerHTML += `
    <tr>
        <td>${table.rows.length}</td>
        <td class="items">${tableItem}</td>
        <td>${tablePurity}</td>
        <td>${tableWtGm}</td>
        <td>${tableWtMg}</td>
        <td>${tableAmount}</td>
        <td class="w-200">${tableMakingCharges}</td>
        <td class="w-200">0</td>
    </tr>
    `
    inpForm.reset();
    trsget()
}
function eventHandle(e, tr) {
    if (e.key === 'Delete' && tr.style.backgroundColor === "lightblue") {
        tr.remove();
        document.removeEventListener('keyup', () => { eventHandle })
    }
}
trsget()
function trsget() {
    let trs = tBody.querySelectorAll('tr');
    trs.forEach(tr => {
        tr.addEventListener('click', (e) => {
            let item = e.target.parentNode;
            e.target.parentNode.style.backgroundColor = "lightblue";
            document.addEventListener('keyup', function(eventT){
                eventHandle(eventT, item)
            })
            e.target.parentNode.addEventListener('click', function(eDash){
                eDash.target.parentNode.style.backgroundColor = "white"
                document.removeEventListener('keyup', () => { eventHandle })
                trsget();
            })
        });
    })
}
let goldPrice = 49000
let goldPriceGm = 49000/10;
function evaluateTable() {
    let rows = table.rows;
    console.log(rows);
    for (let i = 1; i < rows.length; i++) {
        console.log(rows[i]);
        let weight = Number(rows[i].children[3].innerHTML) + (Number(rows[i].children[4].innerHTML) / 10)
        let amount = weight*goldPriceGm;
        rows[i].children[5].innerHTML = amount;
        let finalAmount = amount + Number(rows[i].children[6].innerHTML)
        rows[i].children[7].innerHTML = finalAmount
    }
}