const firebaseConfig = {
    apiKey: "AIzaSyAOX5I_BB9soXF4yHMp9NCPVk2Z-d3DEPE",
    authDomain: "teachingrecord-6b575.firebaseapp.com",
    databaseURL: "https://teachingrecord-6b575-default-rtdb.firebaseio.com",
    projectId: "teachingrecord-6b575",
    storageBucket: "teachingrecord-6b575.appspot.com",
    messagingSenderId: "1097574891233",
    appId: "1:1097574891233:web:d69ed85c4f4b83daad41a0"
};

firebase.initializeApp(firebaseConfig);




function AddStd() {
    var name = document.getElementById('fileName');
    var type = document.getElementById('fileTypes');
    var style = document.getElementById('fileStyle');
    var other = document.getElementById('fileOther');
    var url = document.getElementById('showURL');

    firebase.database().ref("myLibraryBooks/" + name.value).set(
        {
            id: name.value,
            name: name.value,
            type: type.value,
            style: style.value,
            other: other.value,
            bookurl: url.innerText,
        },
    )
    window.location.reload();


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
document.getElementById('uploadBtn').addEventListener('click',function(){
    AddStd();
})