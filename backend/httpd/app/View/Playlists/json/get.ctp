<?php
	// View code - app/View/Posts/json/index.ctp
	// foreach ($posts as &$post) {
	//     unset($post['Post']['generated_html']);
	// }

	$data = array(
		'playlist' => $playlist['Playlist']
	);
	$data['playlist']['sound'] = $playlist['Sound'];
	echo json_encode($data);
?>