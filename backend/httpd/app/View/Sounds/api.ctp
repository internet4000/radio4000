<?php

	// app/View/Recipes/xml/index.ctp
	// Do some formatting and manipulation on
	// the $recipes array.
	$xml = Xml::fromArray(array('response' => $sounds));
	echo $xml->asXML();

?>