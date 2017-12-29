<?php

if (!isset($_POST['name2']) or empty($_POST['name2'])) {
    $error1 = "Заполните поле Телефон<br />";
} else $error1 = NULL;

if (!isset($_POST['phone2']) or empty($_POST['phone2'])) {
    $error1 = "Заполните поле Телефон<br />";
} else $error1 = NULL;

if (empty($error1)) {
    $subject  = $_POST['subject1'];
	$name     = $_POST['name2'];
	$phone    = $_POST['phone2'];
	$headers  = 'Content-type: text/html; charset=utf-8' . "\r\n"; 
    $message  = "Поступила заявка с сайта. Имя отправителя: <b>{$name}</b>. Контактный телефон: <b>{$phone}</b>.";
    if (mail('Katerinasaks@gmail.com', $subject, $message, $headers)) {
        echo "";
    } else echo "Ошибка!"; 
} else {
    echo $error1;
}

?>