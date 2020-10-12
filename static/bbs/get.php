<?php
// Ajax以外からのアクセスを遮断
$request = isset($_SERVER['HTTP_X_REQUESTED_WITH'])
     ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
if($request !== 'xmlhttprequest') exit;
 
$parameter = filter_input(INPUT_POST, 'parameter');
if ($parameter == 'get'){
	$dat = file('bbs.dat');
	$array = array();
	foreach ($dat as $value){
		list($name, $mail, $days, $bbs, $extra) = preg_split("[,]",$value, 5);
		$line = "名前：".$name." メールアドレス：".$mail."</br>\n<date>".$days."</date>\n<p>".$bbs."</p>";
		array_push($array,$line);
	}
	$html = implode("\n", $array);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode(['data' => $html]);
}
