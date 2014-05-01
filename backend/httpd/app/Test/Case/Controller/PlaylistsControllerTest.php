<?php
App::uses('PlaylistsController', 'Controller');

/**
 * PlaylistsController Test Case
 *
 */
class PlaylistsControllerTest extends ControllerTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'app.playlist',
		'app.user',
		'app.sound',
		'app.playlists_sound'
	);

}
