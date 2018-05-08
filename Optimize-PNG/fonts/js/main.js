$(document).ready(function () {
	var pie1 = $('.pie-1'),
	pie2 = $('.pie-2'),
	pie3 = $('.pie-3');
	progressBarUpdate(35, 100, pie1);
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
  }


//Загрузка файла при нажатии на область
var dropZone = document.querySelector('.target').addEventListener('click', function () {
	document.querySelector('.input-file').click();
});


//Изменение поля
var input = document.querySelector('.input-file');
var preview = document.querySelector('.preview-input');

input.style.opacity = 0;input.addEventListener('change', updateImageDisplay);function updateImageDisplay() {
	while(preview.firstChild) {
		preview.removeChild(preview.firstChild);
	}

	var curFiles = input.files;
	if(curFiles.length === 0) {
		var para = document.createElement('p');
		para.textContent = 'No files currently selected for upload';
		preview.appendChild(para);
	} else {
		var list = document.createElement('ul');
		list.className = "after-list";
		preview.appendChild(list);
		for(var i = 0; i < curFiles.length; i++) {
			var listItem = document.createElement('li');
			listItem.className = "after-list-item";
			var para = document.createElement('p');
			para.className = "after-input-text";
			if(validFileType(curFiles[i])) {
				para.textContent =  curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
				var image = document.createElement('img');
				image.className = "after-img";
				image.src = window.URL.createObjectURL(curFiles[i]);

				listItem.appendChild(para);
				listItem.appendChild(image);


			} else {
				para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
				listItem.appendChild(para);
			}

			list.appendChild(listItem);
		}
	}
}var fileTypes = [
'image/jpeg',
'image/pjpeg',
'image/png'
]

function validFileType(file) {
	for(var i = 0; i < fileTypes.length; i++) {
		if(file.type === fileTypes[i]) {
			return true;
		}
	}

	return false;
}function returnFileSize(number) {
	if(number < 1024) {
		return number + 'bytes';
	} else if(number >= 1024 && number < 1048576) {
		return (number/1024).toFixed(1) + 'KB';
	} else if(number >= 1048576) {
		return (number/1048576).toFixed(1) + 'MB';
	}
} 

});

