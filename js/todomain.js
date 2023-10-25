let todoContentList = [];
let selectItem, checkIndex;
let todoContent = {
    content : "",
    checked : false
}
let contentBox = `<div class="content-container">
                        <div class="content-left">
                            <input type="checkbox" class="checkedBox">
                            <input type="text" class="todo-content-input">
                        </div>
                        <div class="content-icon">
                            <i class="fa-solid fa-pen todo-content-inputBtn"></i>
                            <i class="fa-solid fa-trash-can removeBtn"></i>
                        </div>
                    </div>`
function setContent(){
    todoContentList =  JSON.parse(localStorage.getItem('todo'));
    if(todoContentList != null){
        todoContentList.forEach((a) => {
            let contentBox = `<div class="content-container">
                            <div class="content-left">
                                <input type="checkbox" class="checkedBox" ${a.checked ? 'checked' : ''}>
                                <input type="text" class="todo-content-input" readonly value = "${a.content}">
                            </div>
                            <div class="content-icon">
                                <i class="fa-solid fa-pen todo-content-inputBtn"></i>
                                <i class="fa-solid fa-trash-can removeBtn"></i>
                            </div>
                        </div>`
            $(".main-container").append(contentBox);
        });
    }
}
setContent()

function getAndSelectItem(){
    todoContentList =  JSON.parse(localStorage.getItem('todo')) || [];                      //로컬스토리지파일 가져오기
    selectItem = $(this).closest('.content-container').find(".todo-content-input").val()    // todo안에 적혀있는 내용 가져오기
    checkIndex = todoContentList.findIndex(todo => todo.content === selectItem);    
}
$(".create-todo").on("click", function(){
    $(".main-container").append(contentBox);
}
)
$(document).on("change", ".checkedBox", function () {
    getAndSelectItem.call(this)
    trueOrFalse = todoContentList[checkIndex].checked === true ? false : true;
    todoContentList[checkIndex].checked = trueOrFalse;
    localStorage.setItem('todo', JSON.stringify(todoContentList))
    if(trueOrFalse){
        $(this).closest(".content-container").toggleClass("checked-content-container");
    }
})

$(document).on("click",".todo-content-inputBtn",function(){
    getAndSelectItem.call(this)
    $(this).closest('.content-container').find(".todo-content-input").removeAttr('readonly').focus() // 수정 가능상태만들기
}
)

$(document).on("change",".todo-content-input",function(){
    todoContentList =  JSON.parse(localStorage.getItem('todo')) || [];
    todoContent = {
        content :  $(this).val(),
        checked : false
    }
    if(checkIndex === undefined){// 초기에는 removeIndex 값이 undefined가 뜰테니 초기값 설정은 이렇게 한다.
        todoContentList.push(todoContent);
        console.log('todoContentList: ', todoContentList);
    } else{
        if(checkIndex != -1){ //기존에 있던 내용을 수정할때 splice로 수정한다.
            todoContentList.splice(checkIndex, 1, todoContent);
        } else{
            todoContentList.push(todoContent);
        }
    }
    localStorage.setItem('todo', JSON.stringify(todoContentList));
    $(this).attr('readonly', true);
})
$(document).on("click", ".removeBtn", function () {
    getAndSelectItem.call(this)
    todoContentList.splice(checkIndex, 1);
    localStorage.setItem('todo', JSON.stringify(todoContentList));
    $(this).closest(".content-container").remove();
})