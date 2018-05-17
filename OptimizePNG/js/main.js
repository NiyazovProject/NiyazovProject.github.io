document.addEventListener('DOMContentLoaded', function () {
	var timerInterval = 2000;


	var timers = {};
	var imageIndices = {};
	var fileIndex = 0;


	var dropTarget = document.querySelector('.target');
	var inpFile = document.querySelector('.input-file');
	var preview = document.querySelector('.j-images-preview');
	var divMessage = document.querySelector('.j-preview-input');

	var apiBaseUrlElement = document.querySelector('link[rel=apiBaseUrl]');
	var apiBaseUrl = apiBaseUrlElement && apiBaseUrlElement.getAttribute('href') ? apiBaseUrlElement.getAttribute('href') : '';
	var apiPostUrl = apiBaseUrl + '/images';



	// Загрузка файла при нажатии на область
	dropTarget.addEventListener('click', function (e) {
		inpFile.click();
	});
    //  Cкрываем кнопку для включённого яваскрипта, и покажем для выключенного
    var divButtonContainer = document.querySelector(' .j-button-container' );
        divButtonContainer.style.display = 'none';

	ajax(apiBaseUrl + '/images', function (response) {
		preview.innerHTML = '';
		forEach(response.data, function (image) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.className = 'img-link';
			a.setAttribute('href', image.downloadUrl);
			a.style.backgroundImage = 'url("' + image.url + '")';
            a.setAttribute('download', image.name);
			li.setAttribute('title', image.name + '; ' + parseInt(image.ratio * 100) + '%: ' + returnFileSize(image.original) + ' → ' + returnFileSize(image.size));
			li.appendChild(a);
			preview.appendChild(li);
		})
	});

	inpFile.addEventListener('change', processFiles);


	function processFiles() {
		var curFiles = inpFile.files;
		if (curFiles.length === 0) {
			var para = document.createElement('p');
			para.textContent = 'No files currently selected for upload';
			divMessage.appendChild(para);
		} else {
			forEach(curFiles, function (file) {
				if (validFileType(file)) {
					var divPie = document.createElement('div');
					var divImage = document.createElement('div');

					var divClip1 = document.createElement('div');
					var divSlice1 = document.createElement('div');
					var divClip2 = document.createElement('div');
					var divSlice2 = document.createElement('div');
					var divStatus = document.createElement('div');
					var divPercent = document.createElement('div');

					divPie.className = 'pie';
					divPie.id = 'pie-' + fileIndex;
					divImage.className = 'image-preview';

					divClip1.className = 'clip1';
					divClip2.className = 'clip2';
					divStatus.className = 'status';
					divSlice1.className = 'slice1';
					divSlice2.className = 'slice2';
					divPercent.className = 'percent';
					divPercent.innerHTML = '0&thinsp;<span>%</span>'

					divClip1.appendChild(divSlice1);
					divClip2.appendChild(divSlice2);
					divStatus.appendChild(divPercent);
					divPie.appendChild(divClip1);
					divPie.appendChild(divClip2);
					divPie.appendChild(divStatus);

					divImage.style.backgroundImage = 'url("' + window.URL.createObjectURL(file) + '")';

					var listItem = document.createElement('li');
					listItem.appendChild(divPie);
					listItem.appendChild(divImage);

					// Добавляем элемент в список
                    preview.insertBefore(listItem, preview.firstChild);

					ajax_upload(file, fileIndex);
					fileIndex++;
				} else {

				}
			});
		}
	}


	//Начинаем драг-эн-дроп
	var drag = document.getElementById('drag');

	drag.addEventListener('dragenter', dropenter);
	drag.addEventListener('dragover', dropenter);
	drag.addEventListener('dragleave', dropleave);
	drag.addEventListener('drop', dodrop);

	// Эффект при наведении курсора с файлами на зону выгрузки
	function dropenter(e) {
		// Подавить событие
		e.stopPropagation();
		e.preventDefault();
		// Визуальный эффект "зоны выгрузки" при заходе на нее курсора
		drag.style.border = '.2rem dashed #fff';
	}

	// Эффект при отпускании файлов или выходе из зоны выгрузки
	function dropleave() {
		// Привести "зону выгрузки" в первоначальный вид
		drag.style.border = '.2rem dashed #616778';
	}

	// Проверка и отправка файлов на загрузку
	function dodrop(e) {
		var dt = e.dataTransfer;
		if (!dt && !dt.files) {
			return false;
		}

		// Получить список загружаемых файлов
		//var files = dt.files;

		// Fix для Internet Explorer
		dt.dropEffect = 'copy';

		// Загрузить файлы по очереди, проверив их размер
		// Вызываем событие выбора файлов в инпуте
		inpFile.files = dt.files;

		// Подавить событие перетаскивания файла
		e.stopPropagation();
		e.preventDefault();
		return false;
	}


	// AJAX-загрузчик файлов
	function ajax_upload(file, index) {
		// Mozilla, Safari, Opera, Chrome
		if (window.XMLHttpRequest) {
			var httpRequest = new XMLHttpRequest();
		}
		// Internet Explorer
		else if (window.ActiveXObject) {
			try {
				httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch (e) {
				try {
					httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
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

		// Отправить файл на загрузку
		//httpRequest.open('POST', apiPostUrl + '?name=' + name, true);
        httpRequest.open('POST', apiPostUrl, true);
        httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        httpRequest.setRequestHeader('X-File-Name', encodeURIComponent(name));
        httpRequest.onreadystatechange = ajax_callback(httpRequest, index);
		var formData = new FormData();
		formData.append('file', file);
        httpRequest.send(formData);
	}

	// Callback-фунция для отработки AJAX
	function ajax_callback(httpRequest, index) {
		return function () {
			if (httpRequest.readyState == 4) {
				console.log(httpRequest);
				if (httpRequest.status >= 200 && httpRequest.status < 300) {
					// Вернулся JSON
					var data = (httpRequest.getResponseHeader('Content-Type').indexOf('application/json') >= 0) ?
						JSON.parse(httpRequest.response.toString()) : httpRequest.response;
					// Файл загружен успешно
					// Запускаем прогресс
					runProgress(data.id, index);
				}
				else {
					// Ошибка загрузки файла
					console.log(httpRequest);
				}
			}
		}
	}


	var fileTypes = [
		'image/jpeg',
		'image/pjpeg',
		'image/png'
	]

	function validFileType(file) {
		for (var i = 0; i < fileTypes.length; i++) {
			if (file.type === fileTypes[i]) {
				return true;
			}
		}

		return false;
	}

	function returnFileSize(number) {
		if (number < 1024) {
			return number + ' B';
		} else if (number >= 1024 && number < 1048576) {
			return (number / 1024).toFixed(1) + ' kB';
		} else if (number >= 1024 * 1024) {
			return (number / 1024 / 1024).toFixed(1) + ' MB';
		}
	}


	function runProgress(imageId, index) {
		console.info('runProgress for: ' + imageId);
		imageIndices[imageId] = index;
		timers[imageId] = setInterval(function () {
			updateProgress(imageId)
		}, timerInterval);
	}

	function updateProgress(imageId) {
		console.info('updateProgress for: ' + imageId);
		ajax(apiBaseUrl + '/images/' + imageId, function (response) {
			var data = response.data;
			if (data.progress) {
				// Оптимизация ещё идёт
				progressBarUpdate(parseInt(data.progress), 100, imageIndices[imageId]);
			} else {
				// Оптимизация закончилась
				// Очищаем таймер
				timers[imageId] && clearInterval(timers[imageId]);
				timers[imageId] = null;

				progressBarUpdate(100, 100, imageIndices[imageId]);
				// Превращаем элемент списка в ссылку для скачки, делаем это по колхозному :)
                ajax(apiBaseUrl + '/images', function (response) {
                    preview.innerHTML = '';
                    forEach(response.data, function (image) {
                        var li = document.createElement('li');
                        var a = document.createElement('a');
                        a.className = 'img-link';
                        a.setAttribute('href', image.downloadUrl);
                        a.style.backgroundImage = 'url("' + image.url + '")';
                        a.setAttribute('download', image.name);
                        li.setAttribute('title', image.name + '; ' + parseInt(image.ratio * 100) + '%: ' + returnFileSize(image.original) + ' → ' + returnFileSize(image.size));
                        li.appendChild(a);
                        preview.appendChild(li);
                    })
                });
			}
		});
	}

	function rotate(element, degree) {
		//element.style.zoom = 1;
		element.style.transform = 'rotate(' + degree + 'deg)';
		//TODO: сделать для остальных префиксов
		// jQuery
		//element.css({
		//	'-webkit-transform': 'rotate(' + degree + 'deg)',
		//	'-moz-transform': 'rotate(' + degree + 'deg)',
		//	'-ms-transform': 'rotate(' + degree + 'deg)',
		//	'-o-transform': 'rotate(' + degree + 'deg)',
		//	'transform': 'rotate(' + degree + 'deg)',
		//	'zoom': 1
		//});
	}

	function progressBarUpdate(x, outOf, index) {
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

		var slice1 = document.querySelector('#pie-' + index + ' .slice1');
		var slice2 = document.querySelector('#pie-' + index + ' .slice2');
		var percent = document.querySelector('#pie-' + index + ' .percent');

		// set the transition
		rotate(slice1, firstHalfAngle);
		rotate(slice2, secondHalfAngle);

		// set the values on the text
		percent.innerHTML = x + '&thinsp;<span>%</span>';
	};

});


/**
 * Ебануть Аякс
 *
 * @example
 * // GET
 * ajax('/api', function (response) {
 *     var data = response.data;
 *     // ...
 * }
 *
 * // PUT
 * ajax('/api', {method: 'PUT', data: {key: value}, function (response) {
 *     var data = response.data;
 *     // ...
 * }
 *
 * @param {String} url Урл
 * @param {Object|Function} params Объект вида `{method: method, async: true, data: data}`
 * @param {String} params.method HTTP-метод
 * @param {String|Object} params.data Данные для передачи
 * @param {Boolean} [params.async] Асинхронный вызов?
 * @param {Function} [params.onLoad] Что вызвать при загрузке
 * @param {Function} [params.onProgress] Что вызвать при изменении прогресса
 * @param {Function} [params.onError] Что вызвать при ошибке
 * @param {Function} [callback] Выполнить по завершению аякс-вызова
 */
function ajax(url, params, callback) {
	if (!url) {
		throw new Error('Error: `url` parameter is required!');
	}

	params = params || {};

	if (params instanceof Function) {
		callback = params;
	}

	var request = new XMLHttpRequest();

	if (params.onProgress) {
		request.onprogress = params.onProgress;
	}

	request.open(params.method ? params.method : 'GET', url, params.async ? params.async : true);

	if (params.onLoad) {
		request.onload = params.onLoad;
	}

	if (params.onError) {
		request.onerror = params.onError;
	}

	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (callback) {
				var data;
				try {
					var type = request.getResponseHeader('Content-Type');
					data = type.match(/^application\/json/i) ?
						JSON.parse(request.response.toString()) :
						request.response;
				} catch (err) {
					data = null;
				}
				callback({
					ok: request.status >= 200 && request.status <= 299,
					status: request.status,
					statusText: request.statusText,
					body: request.response,
					data: data
				});
			}
		}
	};

	//request.setRequestHeader('Content-Type', 'multipart/form-data');
	request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	if (params.data) {
		// String or JSON payload
		//console.log(params.data instanceof String);
		if (params.data instanceof String) {
			request.send(params.data);
		} else {
			request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			request.send(JSON.stringify(params.data));
		}
	} else {
		request.send(null);
	}
}

function forEach(list, callback) {
	for (var i in list) {
		if (!list.hasOwnProperty(i)) {
			continue;
		}
		callback(list[i], i);
	}
}
