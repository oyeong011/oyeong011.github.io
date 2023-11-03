class Cell{
    constructor(isHeader, disabled, data, row, column, rowName ,colName, active = false){
        this.isHeader = isHeader
        this.disabled = disabled
        this.data = data
        this.row = row
        this.rowName = rowName
        this.column = column
        this.colName = colName
        this.active = active
    }
}
const ROWS = 10
const COLS = 10
const spreadsheet = []
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function createCellEl(cell){
    const cellEl = $("<input>", {
        class : "cell",
        id : "cell_" + cell.row + cell.column,
        value : cell.data,
        disabled : cell.disabled
        
    })
    if(cell.isHeader){
        cellEl.addClass("header")
    }

    cellEl.on('click', () => handleCellClick(cell));
    return cellEl
}
function clearHeaderActiveStates(){
    $(".header").each(function() {
        $(this).removeClass("active");
    });
}
function handleCellClick(cell){
    clearHeaderActiveStates()
    const columnHeader = spreadsheet[0][cell.column]
    const rowHeader = spreadsheet[cell.row][0]
    const columnHeaderEl = getEleFromRowCol(columnHeader.row, columnHeader.column)
    const rowHeaderEl = getEleFromRowCol(rowHeader.row, rowHeader.column)
    columnHeaderEl.addClass("active");
    rowHeaderEl.addClass("active");
}

function getEleFromRowCol(row, col){
    return $(`#cell_${row}${col}`)
}


function drawSheet(){
    for(let i=0; i< spreadsheet.length; i++){
        const rowContainerEl = $("<div>", {
            class : "cell-row"
        })
        for(let j=0; j< spreadsheet[i].length; j++){
            const cell = spreadsheet[i][j]
            rowContainerEl.append(createCellEl(cell))
        }
        spreadSheetContainer.append(rowContainerEl)
    }
}
function initSpreadsheet(){
    for(let i = 0; i< ROWS ; i++){
        let spreadsheetRow = [] 
        for(let j=0;j<COLS;j++){
            let cellData = "";
            let isHeader = false;
            let disabled = false
            if(i === 0){
                cellData = alphabets[j-1]
                isHeader = true
                disabled = true
            }
            if(j === 0){
                cellData = i;
                isHeader = true
                disabled = true
            }
            if(cellData <= 0){
                cellData = "";
            }
            const rowName = i
            const colName = alphabets[j-1]
            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, colName, false)
            spreadsheetRow.push(cell)
        }
        spreadsheet.push(spreadsheetRow)
        console.log('spreadsheet: ', spreadsheet);
    }
    drawSheet()
}

const spreadSheetContainer = $("#spreadsheet-container");
initSpreadsheet();
