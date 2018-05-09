document.addEventListener('DOMContentLoaded', function(){ 
    var pie1 = $('.pie-1'),
    pie2 = $('.pie-2'),
    pie3 = $('.pie-3');
    progressBarUpdate(0, 100, pie1);
    progressBarUpdate(65, 100, pie2);


    function rotate(element, degree) {
        element.css({
            '-webkit-transform': 'rotate(' + degree + 'deg)',
            '-moz-transform': 'rotate(' + degree + 'deg)',
            '-ms-transform': 'rotate(' + degree + 'deg)',
            '-o-transform': 'rotate(' + degree + 'deg)',
            'transform': 'rotate(' + degree + 'deg)',
            'zoom': 1
        });
    }

    function progressBarUpdate(x, outOf, elem) {
        var firstHalfAngle = 180;
        var secondHalfAngle = 0;

    // caluclate the angle
    var drawAngle = x / outOf * 360;

    // calculate the angle to be displayed if each half
    if (drawAngle <= 180) {
        firstHalfAngle = drawAngle;
    } else {
        secondHalfAngle = drawAngle - 180;
    }

    // set the transition
    rotate(elem.find(".slice1"), firstHalfAngle);
    rotate(elem.find(".slice2"), secondHalfAngle);

    // set the values on the text

    elem.find(".procent").html(x + "<span>%</span>");
};


// Загрузка файла при нажатии на область
document.querySelector('.target').addEventListener('click', function (e) {
    document.querySelector('.input-file').click();
        var dt = e.dataTransfer; 
    if(!dt && !dt.files) { return false ; } 

    // Получить список загружаемых файлов 
    var files = dt.files; 

    // Fix для Internet Explorer 
    dt.dropEffect="copy"; 

    // Загрузить файлы по очереди, проверив их размер 
    for (var i = 0; i < files.length; i++) { 
        if (files[i].size<15000000) {  
            // Отправить файл в AJAX-загрузчик 
            ajax_upload(files[i]); 
        } 
        else { 
            alert('Размер файла превышает допустимое значение'); 
        } 
    } 

    // Подавить событие перетаскивания файла 
    e.stopPropagation(); 
    e.preventDefault(); 
    return false; 

});



});


//Начинаем драг-эн-дроп
var tmp=document.getElementById('drag');

// Эффект при наведении курсора с файлами на зону выгрузки
function dropenter(e) {
    // Подавить событие
    e.stopPropagation();
    e.preventDefault();
    // Визуальный эффект "зоны выгрузки" при заходе на нее курсора
    var tmp=document.getElementById('drag');
    tmp.style.border='.2rem dashed #fff';
}

// Эффект при отпускании файлов или выходе из зоны выгрузки
function dropleave() {
    // Привести "зону выгрузки" в первоначальный вид
    var tmp=document.getElementById('drag');
    tmp.style.border='.2rem dashed #616778';
}

// Проверка и отправка файлов на загрузку 
function dodrop(e) { 
    var dt = e.dataTransfer; 
    if(!dt && !dt.files) { return false ; } 

    // Получить список загружаемых файлов 
    var files = dt.files; 

    // Fix для Internet Explorer 
    dt.dropEffect="copy"; 

    // Загрузить файлы по очереди, проверив их размер 
    for (var i = 0; i < files.length; i++) { 
        if (files[i].size<15000000) {  
            // Отправить файл в AJAX-загрузчик 
            ajax_upload(files[i]); 
        } 
        else { 
            alert('Размер файла превышает допустимое значение'); 
        } 
    } 

    // Подавить событие перетаскивания файла 
    e.stopPropagation(); 
    e.preventDefault(); 
    return false; 
} 


// AJAX-загрузчик файлов
function ajax_upload(file) {
    // Mozilla, Safari, Opera, Chrome
    if (window.XMLHttpRequest) {
        var http_request = new XMLHttpRequest();
    }
    // Internet Explorer
    else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                // Браузер не поддерживает эту технологию
                return false;
            }
        }
    }
    else {
        // Браузер не поддерживает эту технологию
        return false;
    }
    var name = file.fileName || file.name;

    // Добавить файлы
    var tmp=document.getElementById('upload_overall');
    var div_circle = document.getElementById('radialC');
    var new_div = div_circle.cloneNode(true);
    new_div.className='percent_div';
    var stback = document.querySelector(' .status');
    stback.style.backgroundImage = "url('https://cs7062.vk.me/c540107/v540107359/2729/fYQlS_23QdA.jpg')";

    
    tmp.appendChild(new_div);


    // Отправить файл на загрузку
    http_request.open('POST', 'upload.php?fname='+name,true);
    http_request.setRequestHeader("Referer", location.href);
    http_request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    http_request.setRequestHeader("X-File-Name", encodeURIComponent(name));
    http_request.setRequestHeader("Content-Type", "application/octet-stream");
    http_request.onreadystatechange=ajax_callback(http_request,new_div,name);
    http_request.send(file);
}

// Callback-фунция для отработки AJAX
function ajax_callback(http_request, obj, name) {
    return function() {
        if (http_request.readyState == 4) {
            if (http_request.status==200) {
                // Вернулся javascript
                if (http_request.getResponseHeader("Content-Type")
                    .indexOf("application/x-javascript")>=0) {
                    eval(http_request.responseText);
            }
                // Файл загружен успешно
                else {
                    obj.style.backgroundPosition='0px 0px';
                    obj.innerHTML=(name + ': 100%');
                }
            }
            else {
                // Ошибка загрузки файла
            }
        }
    }
}

