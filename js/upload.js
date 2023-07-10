import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js"
const firebaseConfig = {
    apiKey: "AIzaSyAOX5I_BB9soXF4yHMp9NCPVk2Z-d3DEPE",
    authDomain: "teachingrecord-6b575.firebaseapp.com",
    databaseURL: "https://teachingrecord-6b575-default-rtdb.firebaseio.com",
    projectId: "teachingrecord-6b575",
    storageBucket: "teachingrecord-6b575.appspot.com",
    messagingSenderId: "1097574891233",
    appId: "1:1097574891233:web:d69ed85c4f4b83daad41a0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
var files = [];
var reader = new FileReader();
var nameBox = document.getElementById('nameBox');
var myimg = document.getElementById('showImgUpload');
var SelBtn = document.getElementById('seleImg');
var extlab = document.getElementById('extlab');
var proglab = document.getElementById('showPercent');
var UpBtn = document.getElementById('uploadBtn');
var showURL = document.getElementById('showURL');
var showCheck = document.getElementById('showCheck');

var input = document.createElement('input');
input.type = 'file';

input.onchange = e => {
    files = e.target.files;

    var extention = GetFileExt(files[0]);
    var name = GetFileName(files[0]);
    nameBox.value = name;
    extlab.innerHTML = extention;
    reader.readAsDataURL(files[0]);
    // UploadProcess();
}
// reader.onload = function () {
//     myimg.src = reader.result;
// }
SelBtn.onclick = function () {
    input.click();
}
function GetFileExt(file) {
    var temp = file.name.split('.');
    var ext = temp.slice((temp.lenth - 1), (temp.lenth));
    return '.' + ext[1];
}
function GetFileName(file) {
    var temp = file.name.split('.');
    var fname = temp.slice(0, -1).join('.');
    return fname;
}
async function UploadProcess() {
    var ImgToUpload = files[0];
    var ImgName = nameBox.value + extlab.innerHTML;
    const metaData = {
        contenType: ImgToUpload.type
    }
    const storage = getStorage();
    const stroageRef = sRef(storage, 'myLibrary/'  + ImgName);
    const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);

    UploadTask.on('state-changed', (snapshot) => {
        var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progess = parseFloat(progess).toFixed(0);
        proglab.innerHTML = "Upload: " + progess + " %";
    },
        (error) => {
            alert("error: image not uploaded!");
        },
        () => {
            getDownloadURL(UploadTask.snapshot.ref).then((getDownloadURL) => {
                console.log(getDownloadURL);
                showURL.value = getDownloadURL;
                proglab.innerHTML = `Upload completed!`;
                setTimeout(function () {
                    proglab.innerHTML = '';
                }, 5000)
            });
        }
    );
}
UpBtn.onclick = UploadProcess;
var dbGrade = localStorage.getItem("newGrade");
var dbYear = localStorage.getItem("newYear");
