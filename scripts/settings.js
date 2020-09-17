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
    input.setAttribute('placeholder', '1-3');
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
            showNotification(0, "שימי לב! הערכים עבור שאלה מספר:" + (i + 1) + " אינם תקינים");
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
            showNotification(0, "יש למלא את כל השדות לפני השמירה");
            return;
        } else if (inputValue === '0' && input.min != '0') {
            showNotification(0, "הערך 0 לא חוקי עבור שמות שחקנים והגדרות כלליות");
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
        var stringCorrectAnswer;
        const element = questionsToSave[index];
        if (element.correctAnswer == 1)
            stringCorrectAnswer = element.answer1;
        else if (element.correctAnswer == 2)
            stringCorrectAnswer = element.answer2;
        else
            stringCorrectAnswer = element.answer3;

        teacher.QuestionsList.push({
            Description: element.question,
            Answer1: element.answer1,
            Answer2: element.answer2,
            Answer3: element.answer3,
            CorrectAnswer: stringCorrectAnswer
        });

        debugger
    } if (teacher.QuestionsList.length < 1) { showNotification(0, "נא למלא שאלות"); return }
    if (teacher.TeacherName == "") { showNotification(0, "נא למלא שם מורה"); return }
    if (teacher.Subject == "") { showNotification(0, "נא למלא מקצוע"); return }
    if (teacher.Matter == "") { showNotification(0, "נא למלא נושא"); return }
    if (teacher.Class == "") { showNotification(0, "נא למלא כיתה"); return }

    //4444444444444444444444444444444444444
    $.ajax({
        type: 'POST',
        async: true,
        data: JSON.stringify(teacher),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        url: "http://localhost:58961/api/Questions/SaveQuestionsForTeacher?teacher=" + teacher,
        success: function (result) {

            if (result) {
                showNotification(1, "הנתונים נשמרו בהצלחה");
            }

            else {
                showNotification(0, "אופססס הנתונים לא נשמרו");
            }
        },
        error: function (arg1, arg2, arg3) {
            showNotification(0, "אופססס הנתונים לא נשמרו");
        }
    });

    //     var dataForSaveString = JSON.stringify(dataObjForSave);
    //    try {
    //        localStorage.setItem('gameSetting', dataForSaveString);
    //   } catch (error) {
    //      console.log('error on reading from local storage')
    //      console.log(error);
    //   }
    //   var dataString = 'var savedData = ' + dataForSaveString;
    //   var encodedString = encodeURIComponent(dataString);
    //   encodedString = btoa(encodedString);
    //   var evalString = 'eval(decodeURIComponent(atob("' + encodedString + '")));';
    //  saveAlert(evalString);
}
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    var y = document.getElementsByTagName('li');
    for (i = 0; i < y.length; i++) {
        if (y[i].classList.contains("selectedTab"))
            y[i].classList.remove("selectedTab");
    }


    document.getElementById(tabName).style.display = "block";
    document.getElementsByClassName(tabName)[0].classList.add("selectedTab");

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
    //         $("#hg").InnerHtml(data);
    //         // history.pushState('', 'New URL: '+href, href); // This Code lets you to change url howyouwant
    //     }});



    // var questionsDetails = document.getElementById('sendDataToServer');
    // questionsDetails.value =dataQuestions;
}

//111111111111111111111111111111111111
function searchBySub() {
    document.getElementById("myDropdown").classList.toggle("show");
    $.ajax({
        type: 'GET',
        async: true,
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        url: "http://localhost:58961/api/Questions/GetSubjects",
        success: function (result) {
            if (result) {
                setDropDownValues(result);
            }
            else {
            }
        },
        error: function (arg1, arg2, arg3) {

        }
    });
    //   var TmpSubjects = ['אנגלית', 'חשבון', 'דקדוק', 'טבע', 'לינארית', 'בוליאנית'];
    // setDropDownValues(TmpSubjects);
}

function setDropDownValues(TmpSubjects) {
    var myDropDownList = document.getElementById("myDropdown");
    if (myDropDownList.childElementCount > 1) {
        myDropDownList.innerHTML = '<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">';
    }
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
    //22222222222222222222222222222222222222
    $.ajax({
        type: 'POST',
        data: JSON.stringify(inputValue.value),
        url: "http://localhost:58961/api/Questions/GetListOfSubject?subject=" + inputValue.value,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",

        success: function (result) {

            if (result) {
                resultTable(result);
            }
            else {
            }
        },
        error: function (arg1, arg2, arg3) {
        }
    });



    //tmpSearcResult = [{
    //    teacherId: '1',
    //    teacherName: 'רחלי טננולד',
    //    subject: 'טבע',
    //    matter: 'גוף האדם',
    //    class: 'ו',
    //    questionnaire: '20',
    //}, {
    //    teacherId: '2',
    //    teacherName: 'רבקי זלקינד',
    //    subject: 'טבע',
    //    matter: 'חשמל',
    //    class: 'ד',
    //    questionnaire: '22',
    //}, {
    //    teacherId: '2',
    //    teacherName: 'יטי ויזל',
    //    subject: 'טבע',
    //    matter: 'החלל',
    //    class: 'יא',
    //    questionnaire: '24',
    //}];
    //    resultTable(tmpSearcResult);
}

function resultTable(tmpSearcResult) {
    document.getElementById("searchResultTable").innerHTML = "";
    var myTableDiv = document.getElementById("searchResultTable");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var tr = document.createElement('TR');
    tr.className += "no-border";
    tableBody.appendChild(tr);

    var td = document.createElement('TD');
    td.appendChild(document.createTextNode('שם מורה'));
    td.className += "bold";
    tr.appendChild(td);

    var td = document.createElement('TD');
    td.appendChild(document.createTextNode('מקצוע'));
    td.className += "bold";
    tr.appendChild(td);

    var td = document.createElement('TD');
    td.appendChild(document.createTextNode('נושא'));
    td.className += "bold";
    tr.appendChild(td);

    var td = document.createElement('TD');
    td.appendChild(document.createTextNode('כיתה'));
    td.className += "bold";
    tr.appendChild(td);

    for (var i = 0; i < tmpSearcResult.length; i++) {
        var tr = document.createElement('TR');
        var questionnaireId = tmpSearcResult[i].questionnaire;
        tr.onclick = function () { getQuestions(questionnaireId) };
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

function getQuestions(questionnaireNum) {

    //ajacs call to fetch all question wich questionnaire == questionnaireNum;
    //success putQuestionsInInput(response.d);
    $.ajax({
        type: 'POST',

        data: JSON.stringify(questionnaireNum),
        url: "http://localhost:58961/api/Questions/GetQuestionsList?questionaire=" + questionnaireNum,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",

        success: function (result) {
            if (result) {
                putQuestionsInInput(result);
            }
            else {
            }
        },
        error: function (arg1, arg2, arg3) {


        }
    });

    //var tmpQuestion = [{
    //    questionId: 1,
    //    questionDesc: 'מי ששכח על הניסים במודים',
    //    answer1: 'אומר לפני שעוקר רגליו',
    //    answer2: 'חוזר למודים',
    //    answer3: 'אינו חוזר',
    //    correctAnswer: 1,
    //    questionnaire: 12,

    //}, {
    //    questionId: 2,
    //    questionDesc: 'כמה ימים דלק השמן בחנוכה',
    //    answer1: 'חודש',
    //    answer2: 'שבוע ויום',
    //    answer3: 'שישה ימים',
    //    correctAnswer: 2,
    //    questionnaire: 12,

    //}, {
    //    questionId: 3,
    //    questionDesc: 'מי ששכח על הניסים בברכת המזון',
    //    answer1: 'חוזר לראש',
    //    answer2: 'אומר בהרחמן',
    //    answer3: 'אינו חוזר',
    //    correctAnswer: 2,
    //    questionnaire: 12,

    //}];
    //putQuestionsInInput(tmpQuestion);
}

function putQuestionsInInput(tmpQuestion) {
    document.getElementById('fillDataQuestion').innerHTML = "";
    for (var q = 0; q < tmpQuestion.length; q++) {
        var para = document.createElement('div');
        var label = document.createElement('label');

        label.innerHTML = 'שאלה';
        para.appendChild(label);

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', tmpQuestion[q].questionDesc);
        para.appendChild(input);
        //the answers
        for (var i = 1; i <= 3; i++) {
            label = document.createElement('label');
            label.innerHTML = 'תשובה' + i;
            para.appendChild(label);

            input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('value', tmpQuestion[q]['answer' + i]);
            input.setAttribute('require', 'require');
            para.appendChild(input);
        }
        //the correct answer
        var numCorrectAnswer;
        if (tmpQuestion[q].answer1 == tmpQuestion[q].CorrectAnswer)
            numCorrectAnswer = 1;
        else if (tmpQuestion[q].answer1 == tmpQuestion[q].CorrectAnswer)
            numCorrectAnswer = 2;
        else
            numCorrectAnswer = 3;
        label = document.createElement('label');
        label.innerHTML = 'מס תשובה נכונה';
        para.appendChild(label);

        input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('max', '3');
        input.setAttribute('min', '1');
        input.setAttribute('value', numCorrectAnswer);
        input.setAttribute('require', 'require');

        para.classList.add("question-card");
        para.appendChild(input);

        //the button 'remove question'
        input = document.createElement('input');
        input.setAttribute('type', 'button');
        input.setAttribute('value', 'הסר שאלה');
        input.addEventListener("click", function () { removeQuestion(event); })
        para.appendChild(input);

        //document.querySelector("#fillDataQuestion").prepend(para);

        // document.querySelector("#fillDataQuestion").appendChild(para);
        document.getElementById('fillDataQuestion').appendChild(para);

    }
    openTab('setQuestion');

}

function startGame() {
    var questionsToSave = [];
    var divInForm = document.getElementsByClassName("question-card")// document.getElementsByTagName("div");
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
            showNotification(0, "שימי לב! הערכים עבור שאלה מספר:" + (i + 1) + " אינם תקינים");
            return;
        } else {
            questionsToSave.push(question);
        }
    }

    var dataObjForSave = {};
    dataObjForSave.date = new Date();
    var generalSettings = '';
    var generalSettingsInputs = document.querySelectorAll('[save-as]');
    for (var i = 0; i < generalSettingsInputs.length; i++) {
        var input = generalSettingsInputs[i];
        var inputValue = input.value;
        if (!inputValue) {
            showNotification(0, "על כל השדות להיות מלאים לפני תחילת משחק")
            return;
        }
        else if (inputValue === '0' && input.min != '0') {
            showNotification(0, "הערך 0 לא חוקי עבור שמות שחקנים והגדרות כלליות")
            return;
        }

        //TODO add validation
        dataObjForSave[input.getAttribute('save-as')] = inputValue;

    }
    localStorage.questions = JSON.stringify(questionsToSave);
    //window.data = dataObjForSave;
    localStorage.data = JSON.stringify(dataObjForSave);
    console.log("localStorage.data:  " + localStorage.data);
    console.log("localStorage.questions:  " + localStorage.questions)
    var url = window.location.href;
    var newurl = url.split('/').slice(0, -1).join('/') + '/bord.html';
    window.location.assign(newurl);
}
function showNotification(result, stringNotification) {
    if (result == 0) {

        $(".notify").addClass("active");

        document.getElementById('notifyType').innerHTML = stringNotification;
        document.getElementById('notifyType').classList.add("failure");
        setTimeout(function () {
            $(".notify").removeClass("active");
            $("#notifyType").removeClass("failure");
        }, 2000)
    }
    else {
        $(".notify").toggleClass("active");
        document.getElementById('notifyType').innerHTML = stringNotification;
        document.getElementById('notifyType').classList.add("success");
        setTimeout(function () {
            $(".notify").removeClass("active");
            $("#notifyType").removeClass("success");
        }, 2000);
    }
}



