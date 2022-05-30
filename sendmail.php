<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';
    
    $file = $_FILES['image'];
    $fileVideo = $_FILES['video'];
    $name = $_POST['name'];
    
    $mail = new PHPMailer(true);
    $mail->CharSet ='UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHtml(true);
    $mail->isSMTP(); 
    $mail->SMTPDebug = 1;
    $mail->SMTPAuth = true; 
    
    
    $mail->Host = 'ssl://smtp.gmail.com';
    $mail->Username = 'workprogexam12';
    $mail->Password = 'workprogexam1234'; // Ваш пароль
    $mail->SMTPSecure = 'ssl'; 
    $mail->Port = 465;

    //От кого письмо
    $mail->setFrom('workprogexam12@gmail.com');
    //Кому отправить
    $mail->addAddress('parfenon.hq@gmail.com');
    //Тема письма
    $mail->Subject = 'Заявка на оценку авто';

    //Тело письма
    $body ='<h1>Информация по заявке</h1>';


    
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['tel']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
    }
    if(trim(!empty($_POST['mark']))){
        $body.='<p><strong>Марка авто:</strong> '.$_POST['mark'].'</p>';
    }
    if(trim(!empty($_POST['model']))){
        $body.='<p><strong>Модель авто:</strong> '.$_POST['model'].'</p>';
    }
    if(trim(!empty($_POST['year']))){
        $body.='<p><strong>Год:</strong> '.$_POST['year'].'</p>';
    }
    if(trim(!empty($_POST['description']))){
        $body.='<p><strong>Описание:</strong> '.$_POST['description'].'</p>';
    }
    if(trim(!empty($_POST['price']))){
        $body.='<p><strong>Ожидаемая стоимость:</strong> '.$_POST['price'].'</p>';
    }
    if (!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }   
    }
    if (!empty($fileVideo['name'][0])) {
        for ($ct = 0; $ct < count($fileVideo['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($fileVideo['name'][$ct]));
            $filename = $fileVideo['name'][$ct];
            if (move_uploaded_file($fileVideo['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }   
    }

    $mail->Body = $body;


    //Отправление
    if (!$mail->send()){
        $message = 'Ошибка';
    } else {
        $message = 'Данные доставлены';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode(["message" => $message, "resultfile" => $rfile]);	