<?php
App::uses('AppController', 'Controller');
/**
 * Playlists Controller
 *
 * @property Playlist $Playlist
 * @property PaginatorComponent $Paginator
 * @property SessionComponent $Session
 */
class PlaylistsController extends AppController {


	public $uses = array('Playlist', 'Sound');

/**
 * Components
 *
 * @var array
 */
	public $components = array('Paginator', 'Session', 'RequestHandler');

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Playlist->recursive = 1;
		$this->Playlist->unbindModel(array(
			'belongsTo' => array('User')
		));
		$this->set(array(
			'playlists' => $this->Paginator->paginate(),
        	'_serialize' => array('playlists')
        ));
	}

/**
 * get method
 *
 * @return void
 */
	public function get($id=1) {

		if (!$this->Playlist->exists($id)) {
			throw new NotFoundException(__('Invalid Playlist'));
		}
		$this->Playlist->recursive = 1;
		$this->Playlist->unbindModel(array(
			'belongsTo' => array('User')
		));

		$options = array('conditions' => array('Playlist.' . $this->Playlist->primaryKey => $id));

		$this->set(array(
			'playlist' => $this->Playlist->find('first', $options),
		));
	}

	public function add() {
 		// CakeLog::error( print_r( $this->request->is(array('post', 'put')) , true) );
 		// CakeLog::error( print_r( $this->request->data, true) );
 		
		// if (!$this->Playlist->exists($id)) {
		// 	throw new NotFoundException(__('Invalid Playlist'));
		// }
		if ($this->request->is(array('post', 'put'))) {

			if ($this->Sound->save($this->request->data)) {
				$message = __('The Playlist has been saved.');
			} else {
				$message = __('The Playlist could not be saved. Please, try again.');
			}
		} else {
			$message = __('No post/put');
			$options = array('conditions' => array('Playlist.' . $this->Playlist->primaryKey => 1));
			$this->request->data = $this->Playlist->find('first', $options);
		}
		$this->set(array(
		    'message' => $message,
		    '_serialize' => array('message')
		));

		// $this->Plalist->id = 1;
		// $this->Plalist->id = 1;
		// $this->Playlist-set('title', 'steve');
		// $this->Playlist->save();
		// // if ($this->Plalist->save($this->request->data)) {
		// //     $message = 'Saved';
		// // } else {
		// //     $message = 'Error';
		// // }
		// // $this->set(array(
		// //     'message' => $message,
		// //     '_serialize' => array('message')
		// // ));
		// $this->set(array(
		//     'message' => $message,
		//     '_serialize' => array('message')
		// ));

		//$this->Playlist->recursive = 0;
		// $this->set('playlists', $this->Paginator->paginate());
  		// $this->set('_serialize', array('playlists'));


		// $this->Playlist->create();
		// $this->Playlist->set('title', serialize($this->request));
		// $this->Playlist->save();
		// if ($this->Playlist->save($this->request->data)) {
		// 	$this->Session->setFlash(__('The Playlist has been saved.'));
		// 	return $this->redirect(array('action' => 'index'));
		// } else {
		// 	$this->Session->setFlash(__('The Playlist could not be saved. Please, try again.'));
		// }
	}

}
