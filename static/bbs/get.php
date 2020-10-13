<?php
// Ajax以外からのアクセスを遮断
$request = isset($_SERVER['HTTP_X_REQUESTED_WITH'])
     ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
if($request !== 'xmlhttprequest') exit;
 
$parameter = filter_input(INPUT_POST, 'parameter');
if ($parameter == 'get'){
	$dat = file('bbs.dat',FILE_IGNORE_NEW_LINES);
	$array = array();
	foreach ($dat as $value){
		list($name, $mail, $days, $bbs, $extra) = preg_split("[,]",$value, 5);
		$line = "名前：".$name." メールアドレス：".$mail."</br><date>".$days."</date><p>".str_replace(array("\r", "\n"), '', $bbs)."</p>";
		array_push($array,$line);
	}
	$html = implode("\n", $array);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode(['data' => $html]);
}
if ($parameter == 'send'){
	$name = filter_input(INPUT_POST, 'name');
	$mail = filter_input(INPUT_POST, 'mail');
	$text = filter_input(INPUT_POST, 'text');
	$w = date("w");
	$week_name = array("日", "月", "火", "水", "木", "金", "土");

	$line = $name.",".$mail.",".date("Y年m月d日")."（$week_name[$w]）".date("H:i:s").",".str_replace(array("\r", "\n"), '', nl2br($text));
	$dat = file('bbs.dat',FILE_IGNORE_NEW_LINES);
	array_unshift($dat,$line);
	file_put_contents('bbs.dat',implode("\n", $dat));
	$array = array();
	foreach ($dat as $value){
		list($name, $mail, $days, $bbs, $extra) = preg_split("[,]",$value, 5);
		$line = "名前：".$name." メールアドレス：".$mail."</br><date>".$days."</date><p>".str_replace(array("\r", "\n"), '', $bbs)."</p>";
		array_push($array,$line);
	}
	$html = implode("\n", $array);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode(['data' => $html]);
}