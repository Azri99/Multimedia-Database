const uriApi = 'http://localhost:5000/api/v1';
const uriDash = 'http://localhost:5000/dashboard';


function updateDashboard(e){
    e.preventDefault();
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    let storage= e.target.storage.value;
    let filename= e.target.filename.value;
    let filetype= e.target.filetype.value;
    let file = e.target.file.files[0];

    formData.append('data', JSON.stringify({filetype, filename}));
    formData.append('file', file);
    xhr.open('PUT', `${uriApi}/${storage}`);
    xhr.onload = function(){
         var result = JSON.parse(xhr.responseText);
         if(xhr.readyState==4&&xhr.status=='200'){
              alert('Done Update');
              location.replace(uriDash);
         }
         else{
              alert('Something is wrong');
         }
    };
    xhr.send(formData);  
}
function deleteDashboard(e){
    e.preventDefault();
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    let storage= e.target.storage.value;
    let filename = e.target.filename.value;

    xhr.open('DELETE', `${uriApi}/${storage}/${filename}`);
    xhr.onload = function(){
         var result = JSON.parse(xhr.responseText);
         if(xhr.readyState==4&&xhr.status=='200'){
              alert('Done Update');
              location.replace(uriDash);
         }
         else{
              alert('Something is wrong');
         }
    };
    xhr.send(formData);  
}

function inputDashboard(e){
     e.preventDefault();
     var formData = new FormData();
     var xhr = new XMLHttpRequest();
 
     let filetype= e.target.filetype.value;
     let storage= e.target.storage.value;
     let file = e.target.file.files[0];
 
     formData.append('data', JSON.stringify({filetype}));
     formData.append('file', file);
     xhr.open('POST', `${uriApi}/${storage}`);
     xhr.onload = function(){
          var result = JSON.parse(xhr.responseText);
          if(xhr.readyState==4&&xhr.status=='200'){
               alert('Done Update');
               location.replace(uriDash);
          }
          else{
               alert('Something is wrong');
          }
     };
     xhr.send(formData);       
 }
 