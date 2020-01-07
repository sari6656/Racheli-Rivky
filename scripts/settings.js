function addQuestion(addFirst) {//make the tamplate
    //document.getElementById("addQuestion").addEventListener("click", addQuestion);

    //the question
    var para = document.createElement('div');
    var label = document.createElement('label');

    label.innerHTML = 'שאלה';
    para.appendChild(label);

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    para.appendChild(input);
    //the answers
    for (var i = 1; i <= 3; i++) {
        label = document.createElement('label');
        label.innerHTML = 'תשובה' + i;
        para.appendChild(label);

        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('require', 'require');
        para.appendChild(input);
    }
    //the correct answer
    label = document.createElement('label');
    label.innerHTML = 'מס תשובה נכונה';
    para.appendChild(label);

    input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('max', '3');
    input.setAttribute('min', '1');
    input.setAttribute('placeholder', ' 1-3');
    input.setAttribute('require', 'require');

    para.classList.add("question-card");
    para.appendChild(input);

    //the button 'remove question'
    input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('value', 'הסר שאלה');
    input.addEventListener("click", function () { removeQuestion(event); })
    para.appendChild(input);
    if (addFirst) {
        document.querySelector("#fillDataQuestion").prepend(para);
    } else {
        document.querySelector("#fillDataQuestion").appendChild(para);
    }
}


function removeQuestion(e) {
    var para = e.target.parentElement;
    para.parentElement.removeChild(para);
}


function fillDivs() {//on click 'view the questions'
    //e.target.classList.add("w3-disabled")
    var divInForm;
    for (var i = 0; i < data.questions.length; i++) {
        addQuestion();
    }
    divInForm = document.querySelectorAll(" #fillDataQuestion>div");
    var inputInDiv;

    for (var i = 0; i < data.questions.length; i++) {
        inputInDiv = divInForm[i].getElementsByTagName("input");
        inputInDiv[0].value = data.questions[i].question;
        inputInDiv[1].value = data.questions[i].answer1;
        inputInDiv[2].value = data.questions[i].answer2;
        inputInDiv[3].value = data.questions[i].answer3;
        inputInDiv[4].value = data.questions[i].correctAnswer;
    }
}

function fillArrary() {//onclick 'save'
    var questionsToSave = [];
    var divInForm = document.querySelectorAll("form div")// document.getElementsByTagName("div");
    var inputInDiv;
    for (var i = 0; i < divInForm.length; i++) {
        inputInDiv = divInForm[i].getElementsByTagName("input");
        var question = {};
        question.question = inputInDiv[0].value;
        question.answer1 = inputInDiv[1].value;
        question.answer2 = inputInDiv[2].value;
        question.answer3 = inputInDiv[3].value;
        question.correctAnswer = inputInDiv[4].value;
        if (question.correctAnswer < 1 || question.correctAnswer > 3
            || !question.question
            || !question.answer1
            || !question.answer2
            || !question.answer3
            || !question.correctAnswer) {
            alert("שימי לב! הערכים עבור שאלה מספר:" + (i + 1) + " אינם תקינים");
            return;
        } else {
            questionsToSave.push(question);
        }
    }
    for (var i = 0; i < divInForm.length; i++) {
        console.log(data.questions[i]);
    }
    var dataObjForSave = {};
    dataObjForSave.date = new Date();
    var generalSettings = '';
    var generalSettingsInputs = document.querySelectorAll('[save-as]');
    for (var i = 0; i < generalSettingsInputs.length; i++) {
        var input = generalSettingsInputs[i];
        var inputValue = input.value;
        if (!inputValue) {
            alert("יש למלא את כל השדות לפני השמירה");
            return;
        } else if (inputValue === '0' && input.min != '0') {
            alert("הערך 0 לא חוקי עבור שמות שחקנים והגדרות כלליות");
            return;
        }

        //TODO add validation
        dataObjForSave[input.getAttribute('save-as')] = inputValue;
    }

    dataObjForSave.questions = questionsToSave;

    var teacher = {
        TeacherName: $("#teacherName").val(),
        Subject: $("#subject").val(),
        Matter: $("#matter").val(),
        Class: $("#classNumber").val(),
        QuestionsList: []
    }

    for (let index = 0; index < questionsToSave.length; index++) {
        const element = questionsToSave[index];
        teacher.QuestionsList.push({
            Description: element.question,
            Answer1: element.answer1,
            Answer2: element.answer2,
            Answer3: element.answer3,
            CorrectAnswer: element.correctAnswer
        });


    }
    $.ajax({
        type: 'POST',
        async: true,
        data: JSON.stringify(teacher),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        url: "http://localhost:58961/api/Questions/SaveQuestionsForTeacher",
        success: function (result) {
            if (result.d) {
                debugger;
            }
            else {
            }
        },
        error: function (arg1, arg2, arg3) {
            debugger;
        }
    });

    // var dataForSaveString = JSON.stringify(dataObjForSave);
    // try {
    //     localStorage.setItem('gameSetting', dataForSaveString);
    // } catch (error) {
    //     console.log('error on reading from local storage')
    //     console.log(error);
    // }
    // var dataString = 'var savedData = ' + dataForSaveString;
    // var encodedString = encodeURIComponent(dataString);
    // encodedString = btoa(encodedString);
    // var evalString = 'eval(decodeURIComponent(atob("' + encodedString + '")));';
    // //saveAlert(evalString);
}
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}
function onLoad() {
    fillDivs()
    if (document.getElementsByClassName("city").length)
        openTab("setQuestion");
    var generalSettingsInputs = document.querySelectorAll('[save-as]');
    for (var i = 0; i < generalSettingsInputs.length; i++) {
        var input = generalSettingsInputs[i];
        if (typeof data[input.getAttribute('save-as')] !== 'undefined' && data[input.getAttribute('save-as')] !== null) {
            input.value = data[input.getAttribute('save-as')];
        }
    }
}

function saveAlert(msg) {
    var elem = document.getElementById('msgAlert');
    elem.style.display = 'block';
    elem.querySelector("textarea").innerHTML = msg;
}
function copyToClip(str) {
    //function listener(e) {
    //    e.clipboardData.setData("text/html", str);
    //    e.clipboardData.setData("text/plain", str);
    //    e.preventDefault();
    //}
    //document.addEventListener("copy", listener);
    //document.execCommand("copy");
    //document.removeEventListener("copy", listener);
    var txtarea = document.getElementsByTagName("textarea")[0];
    txtarea.focus();
    txtarea.setSelectionRange(0, txtarea.innerHTML.length);
    document.execCommand("copy");

};

function sendQuestionsToServer() {
    fillArrary();
    var dataQuestions = { detailsQuestions: [] };
    var details = document.getElementsByClassName('dataToServer');
    for (var x = 0; x < details.length; x++) {
        var abg = new String(details[x].value);
        dataQuestions.detailsQuestions.push({ abg: (details[x].value) });
    }
    //    alert( $.post("https://localhost:44399/api/my/Get", { ttttt:dataQuestions}));
    // $(function() {
    //     $.getJSON("https://localhost:44399/api/Values/GetEmployer", function(crewResponse) {
    //         dataQuestions = crewResponse.dataQuestions;
    //     });
    // });

    // $.ajax({
    //     contentType: "text/html; charset=utf-8",
    //     url: "https://localhost:44399/api/my",
    //     type: "POST",
    //     dataType: "string",  
    //     data: new String(dataQuestions) ,
    //     success: function (data) {
    //         debbuger;
    //         $("#hg").InnerHtml(data);
    //         // history.pushState('', 'New URL: '+href, href); // This Code lets you to change url howyouwant
    //     }});



    // var questionsDetails = document.getElementById('sendDataToServer');
    // questionsDetails.value =dataQuestions;
}


function searchBySub() {
    document.getElementById("myDropdown").classList.toggle("show");
    debugger;
    $.ajax({
        type: 'POST',
        async: true,
        data: JSON.stringify(true),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        url: "http://localhost:58961/api/Questions/GetSubjects",
        success: function (result) {
            if (result.d) {
                setDropDownValues(result.d);
            }
            else {
            }
        },
        error: function (arg1, arg2, arg3) {
            debugger;
        }
    });
}
setDropDownValues([]);
function setDropDownValues(subjectsArr) {
    var TmpSubjects = ['אנגלית', 'חשבון', 'דקדוק', 'טבע', 'לינארית', 'בוליאנית'];
    var myDropDownList = document.getElementById("myDropdown");
    for (var i = 0; i < TmpSubjects.length; i++) {
        var aTag = document.createElement('a');
        aTag.onclick = function () { setInputValue() };
        aTag.textContent = TmpSubjects[i];
        myDropDownList.appendChild(aTag);
    }
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
function setInputValue() {
    inputValue = document.getElementById('myInput');
    inputValue.value = event.target.innerText;
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        a[i].style.display = "none";
    }

    $.ajax({
        type: 'POST',
        async: true,
        data: JSON.stringify(inputValue.value),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        url: "http://localhost:58961/api/Questions/GetListOfSubject",
        success: function (result) {
            if (result.d) {
                resultTable(result.d);
            }
            else {
            }
        },
        error: function (arg1, arg2, arg3) {
            debugger;
        }
    });
    resultTable([]);
    function resultTable(searcResult) {
        tmpSearcResult = [{
            teacherId: '1',
            teacherName: 'רחלי טננולד',
            subject: 'טבע',
            matter: 'גוף האדם',
            class: 'ו',
            questionnaire: '20',
        }, {
            teacherId: '2',
            teacherName: 'רבקי זלקינד',
            subject: 'טבע',
            matter: 'חשמל',
            class: 'ד',
            questionnaire: '22',
        }, {
            teacherId: '2',
            teacherName: 'יטי ויזל',
            subject: 'טבע',
            matter: 'החלל',
            class: 'יא',
            questionnaire: '24',
        }];
        document.getElementById("searchResultTable").innerHTML = "";
        var myTableDiv = document.getElementById("searchResultTable");

        var table = document.createElement('TABLE');
        table.border = '1';

        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode('שם מורה'));
        td.className +="bold";
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode('מקצוע'));
        td.className +="bold";
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode('נושא'));
        td.className +="bold";
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode('כיתה'));
        td.className +="bold";
        tr.appendChild(td);

        for (var i = 0; i < tmpSearcResult.length; i++) {

            var tr = document.createElement('TR');
            tr.onclick = function () { getQuestions(tmpSearcResult[i].questionnaire) };
            tableBody.appendChild(tr);

            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(tmpSearcResult[i].teacherName));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(tmpSearcResult[i].subject));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(tmpSearcResult[i].matter));
            tr.appendChild(td);

            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(tmpSearcResult[i].class));
            tr.appendChild(td);

        }
        myTableDiv.appendChild(table);

    }


}
