// const firebaseConfig = {
//     apiKey: "AIzaSyAOX5I_BB9soXF4yHMp9NCPVk2Z-d3DEPE",
//     authDomain: "teachingrecord-6b575.firebaseapp.com",
//     databaseURL: "https://teachingrecord-6b575-default-rtdb.firebaseio.com",
//     projectId: "teachingrecord-6b575",
//     storageBucket: "teachingrecord-6b575.appspot.com",
//     messagingSenderId: "1097574891233",
//     appId: "1:1097574891233:web:d69ed85c4f4b83daad41a0"
// };

// firebase.initializeApp(firebaseConfig);


const getElementVal = (id) => {
    return document.getElementById(id).value;
};
function selectAllData() {
    // document.getElementById('myNewInput').innerHTML = "";
    studentN0 = 0;
    firebase.database().ref('myLibraryBooks').once('value',
        function (AllRecords) {
            AllRecords.forEach(
                function (CurrentRecord) {
                    var id = CurrentRecord.val().id;
                    var name = CurrentRecord.val().name;
                    var type = CurrentRecord.val().type;
                    var style = CurrentRecord.val().style;
                    var other = CurrentRecord.val().other;
                    var url = CurrentRecord.val().bookurl;
                    addItemsToTable(id, name, type, style, other, url);
                }
            );
        });

}
window.onload = selectAllData;
var studentN0;

var stdList = [];
function addItemsToTable(id, name, type, style, other, url) {
    var tbody = document.getElementById('myCard');

    stdList.push([id, name, type, style, other, url]);
    
    let tr = `
                       <div class="card card-dark-blue">
                                    <div class="card-body" onclick="Fillbox(${studentN0})">
                                        <div style="background-color: transparent;color: white;">
                                            <span style="color: brown;font-weight: bold;display:none ">
                                                ${++studentN0}</span>

                                            <table class="table-borderless table">
                                                <tr>
                                                    <td style="background-color: transparent;color: white;">
                                                        Name: <span style="color: rgb(247, 235, 146);font-weight: bold">
                                                            ${name}</span>
                                                    </td>
                                                    <td style="background-color: transparent;color: white;">
                                                        Type of Book: ${type}
                                                    </td>
                                                    <td style="background-color: transparent;color: white;">
                                                        Book Styles: ${style}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="background-color: transparent;color: white;">
                                                        <button type="button"
                                                            class="btn btn-inverse-success btn-fw">Open</button>
    
                                                        <button type="button"
                                                            class="btn btn-inverse-danger btn-fw">Download</button>
                                                    </td>

                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <br>
            
            `
    tbody.innerHTML += tr;
}

var Mname = document.getElementById('fileName');
var type = document.getElementById('fileTypes');
var style = document.getElementById('fileStyle');
var other = document.getElementById('fileOther');
var url = document.getElementById('showURL');

var BtnSubmit = document.getElementById('mySubmit');
var BtnUpdate = document.getElementById('myUpdate');
var BtnDele = document.getElementById('myDele');
var BtnClearBox = document.getElementById('myClear');
var BtnClearAll = document.getElementById('myClearAll');


function Fillbox(index) {
    if (index == null) {
        BtnSubmit.style.display = 'inline-block';
        BtnUpdate.style.display = 'none';
        BtnDele.style.display = 'none';
        BtnClearBox.style.display = 'none';

    }
    else {
        Mname.value = stdList[index][1];
        type.value = stdList[index][2];
        style.value = stdList[index][3];
        other.value = stdList[index][4];
        url.innerText = stdList[index][5];
        BtnClearBox.style.display = 'inline-block';

        BtnSubmit.style.display = 'none';
        BtnUpdate.style.display = 'inline-block';
        BtnDele.style.display = 'inline-block';
    }
}
NewBox();

function NewBox() {
    let r = (Math.random() + 1).toString(36).substring(7);
    Mid.value = r;
    Mdate.value = '';
    Mtimes.value = '';
    Mweeks.value = '';
    Mmonth.value = '';
    Mother.value = '';
    // Mmypaid.value = '';
    BtnSubmit.style.display = 'inline-block';
    BtnUpdate.style.display = 'none';
    BtnDele.style.display = 'none';
    BtnClearBox.style.display = 'none';
}

function AddStd(e) {
    firebase.database().ref("myNotePad/" + Mdate.value).set(
        {
            id: Mid.value,
            date: Mdate.value,
            times: Mtimes.value,
            weeks: Mweeks.value,
            month: Mmonth.value,
            other: Mother.value,
            pay: Mmypaid.value,
        },
    )
    selectAllData();
    window.location.reload();
    e.preventDefault();


}
function UpStd(e) {
    firebase.database().ref("myNotePad/" + Mdate.value).update(
        {
            id: Mid.value,
            date: Mdate.value,
            times: Mtimes.value,
            weeks: Mweeks.value,
            month: Mmonth.value,
            other: Mother.value,
            pay: Mmypaid.value,
        },
    )
    selectAllData();
    e.preventDefault();
    window.location.reload();

}
function DelStd(e) {
    firebase.database().ref("myNotePad/" + Mdate.value).remove().then(
        function () {
            selectAllData();
            // window.location.reload();
            e.preventDefault();

        }
    )
}
function DelStdAll() {
    firebase.database().ref("myNotePad").remove();

    // window.location.reload();
}
