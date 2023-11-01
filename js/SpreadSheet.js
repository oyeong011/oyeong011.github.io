const ROWS = 10
const COLS = 10
const spreadsheet = []


class Cell{
    constructor(isHeader, disabled, data, row, column, active = false){
        this.isHeader = isHeader
        this.disabled = disabled
        this.data = data
        this.row = row
        this.column = column
        this.active = active
    }
}
function createCellEl(cell){
    const cellEl = $("<input>")
    cellEl.className = "cell"
    cellEl.id = "cell_" + cell.row + cell.column
    cellEl.value = cell.data
    cellEl.disabled = cell.disabled
    return cellEl
}

function drawSheet(){
    for(let i=0; i< spreadsheet.length; i++){
        for(let j=0; j< spreadsheet[i].length; j++){
            const cell = spreadsheet[i][j]
            spreadSheetContainer.append(createCellEl(cell))
        }
    }
}
function initSpreadsheet(){
    for(let i = 0; i< COLS ; i++){
        let spreadsheetRow = [] 
        for(let j=0;j<COLS;j++){
            const cell = new Cell(false, false, i + "-" + j, i, j, false)
            spreadsheetRow.push(i + "-" + j)
        }
        spreadsheet.push(spreadsheetRow)
        console.log('spreadsheetRow: ', spreadsheetRow);
    }
    drawSheet()
    console.log("spreadsheet" + spreadsheet)
}

const spreadSheetContainer = $("#spreadsheet-container");
initSpreadsheet();
