<?php
 
$parameter = filter_input(INPUT_POST, 'parameter');
if ($parameter == 'get'){
	$dat = file('../bbs.dat',FILE_IGNORE_NEW_LINES);
	print_html($dat);
}
if ($parameter == 'send'){
	$name = filter_input(INPUT_POST, 'name');
	$mail = filter_input(INPUT_POST, 'mail');
	$text = filter_input(INPUT_POST, 'text');
	$w = date("w");
	$week_name = array("日", "月", "火", "水", "木", "金", "土");

	$line = $name.",".$mail.",".date("Y年m月d日")."（$week_name[$w]）".date("H:i:s").",".str_replace(array("\r", "\n"), '', nl2br($text));
	$dat = file('../bbs.dat',FILE_IGNORE_NEW_LINES);
	array_unshift($dat,$line);
	file_put_contents('../bbs.dat',implode("\n", $dat));
	print_html($dat);
}

function print_html($dat){
	$array = array();
	foreach ($dat as $value){
		list($name, $mail, $days, $bbs, $extra) = preg_split("[,]",$value, 5);
		if ($mail != ""){
			$line = "<article class='bbs'><p>名前：<a href='mailto:".$mail."'>".$name."</a>　".$days."</p>".str_replace(array("\r", "\n"), '', $bbs)."</article>";
		}else{
			$line = "<article class='bbs'><p>名前：".$name."　".$days."</p>".str_replace(array("\r", "\n"), '', $bbs)."</article>";
		}
		array_push($array,$line);
	}
	$html = implode("\n", $array);
	header('Content-type: application/json; charset=utf-8');
	echo json_encode(['data' => $html]);
}