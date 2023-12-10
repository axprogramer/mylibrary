const firebaseConfig = {
    apiKey: "AIzaSyAJ61CR4hcHajBf8T02wl-REVx8SnRxklE",
    authDomain: "useradmin-cd653.firebaseapp.com",
    databaseURL: "https://useradmin-cd653-default-rtdb.firebaseio.com",
    projectId: "useradmin-cd653",
    storageBucket: "useradmin-cd653.appspot.com",
    messagingSenderId: "51017691764",
    appId: "1:51017691764:web:9f322ae1ee6c00c5ce5721"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();
var nameDb = 'videos/' + getunit;
var getgrade = localStorage.getItem('getGrade');
var getunit = localStorage.getItem('getUnit');

var listRef = storageRef.child('LGReaderAPK/');

// Create a reference under which you want to list
var grade = document.getElementById('getGrade');
var unit = document.getElementById('getUnit');



listRef.listAll().then((result) => {
    n0 = 0;
    result.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
            viewImg(url, getname)
            // clickToPlay();
        })
        var name = imageRef.name;
        var temp = name.split('.');
        var ext = temp.slice((temp.lenth - 1), (temp.lenth));
        var getname = ext[0];
    });
});
var imgDataView = [];
var n0;
function viewImg(getUURL, getname) {
    var viewPlace = document.getElementById('viewIII');
    imgDataView.push([getUURL, getname]);
    let ii = `
    <td style="text-align: left;">
    <p style="color: red;"></p>
    
    <p><a href="${getUURL}"><button type="button" class="btn btn-warning btn-rounded btn-fw"  id="${getname}"><i class="bi bi-arrow-down-circle"></i></button>&nbsp;&nbsp;</a>${getname}</p>
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
    for (var i = 0; i < imgDataView.length; i++) {
        var name = imgDataView[i][1];
        var url = imgDataView[i][0];
        var player = document.getElementById('myPlayer');
        var playII = document.getElementById('playVV');
        playII.src = urlPlay;
        playII.autoplay = true;
        document.getElementById(`${name}`).addEventListener('click',function(){
            var nn = this.value;
            localStorage.setItem('playURL',nn)
            window.location.reload();            
        })
    }
}

var urlPlay = localStorage.getItem('playURL');