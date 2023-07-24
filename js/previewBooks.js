const firebaseConfig = {
    apiKey: "AIzaSyCghBrr_537ClR_J54jw-ZXuQkvRYDv3vw",
    authDomain: "keepnote-6d67b.firebaseapp.com",
    databaseURL: "https://keepnote-6d67b-default-rtdb.firebaseio.com",
    projectId: "keepnote-6d67b",
    storageBucket: "keepnote-6d67b.appspot.com",
    messagingSenderId: "544458020315",
    appId: "1:544458020315:web:5bb8a147b9fa22d9b983fe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();
var nameDb = 'answerkeyBooks/MathG7/Practice/';
var getgrade = localStorage.getItem('getGrade');
var getunit = localStorage.getItem('getUnit');

var listRef = storageRef.child('answerkeyBooks/MathG7/Practice/');

// Create a reference under which you want to list
var grade = document.getElementById('getGrade');
var unit = document.getElementById('getUnit');



listRef.listAll().then((result) => {
    n0 = 0;
    result.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
            viewImg(url, getname)
            clickToPlay();
            pdfDataView.sort(function (a, b) { return b.getname - a.getname });

        })
        var name = imageRef.name;
        var temp = name.split('.');
        var ext = temp.slice((temp.lenth - 1), (temp.lenth));
        var getname = ext[0];
    });
});
var pdfDataView = [];
var n0;
function viewImg(getUURL, getname) {
    var viewPlace = document.getElementById('viewIII');
    pdfDataView.push([getUURL, getname]);
    let ii = `
    <td style="text-align: left;">
    <p style="color: red;"></p>
    
    <p><button type="button" class="btn btn-primary btn-rounded btn-fw" value="${getUURL}" id="${getname}"><i class="bi bi-play"></i></button> &nbsp;&nbsp;&nbsp;&nbsp;#${++n0} ${getname}</p>
    <br>
    `
    viewPlace.innerHTML += ii;
}
grade.addEventListener('change', () => {
    var unit = document.getElementById('getGrade');
    var show = unit.value;
    localStorage.setItem('getGrade', show);
    window.location.reload();
})
unit.addEventListener('change', () => {
    var unit = document.getElementById('getUnit');
    var show = unit.value;
    localStorage.setItem('getUnit', show);
    window.location.reload();
})

grade.value = getgrade;
unit.value = getunit;

function clickToPlay() {
    for (var i = 0; i < pdfDataView.length; i++) {
        var name = pdfDataView[i][1];
        var url = pdfDataView[i][0];
        var player = document.getElementById('myPlayer');
        var playII = document.getElementById('myShowPDF');
        playII.src = urlPlay;
        document.getElementById(`${name}`).addEventListener('click', function () {
            var nn = this.value;
            localStorage.setItem('loadPDF', nn)
            window.location.reload();
        })
    }
}

var urlPlay = localStorage.getItem('loadPDF');