<?php
App::uses('Sound', 'Model');

/**
 * Sound Test Case
 *
 */
class SoundTest extends CakeTestCase {

/**
 * Fixtures
 *
 * @var array
 */
	public $fixtures = array(
		'app.sound',
		'app.user',
		'app.playlist',
		'app.playlists_sound'
	);

/**
 * setUp method
 *
 * @return void
 */
	public function setUp() {
		parent::setUp();
		$this->Sound = ClassRegistry::init('Sound');
	}

/**
 * tearDown method
 *
 * @return void
 */
	public function tearDown() {
		unset($this->Sound);

		parent::tearDown();
	}

}
