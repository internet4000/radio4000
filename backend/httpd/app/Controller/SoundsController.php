<?php
App::uses('AppController', 'Controller');
/**
 * Sounds Controller
 *
 * @property Sound $Sound
 * @property PaginatorComponent $Paginator
 * @property SessionComponent $Session
 */
class SoundsController extends AppController {

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
		$this->Sound->recursive = 0;
		$this->set('sounds', $this->Paginator->paginate());
        $this->set('_serialize', array('sounds'));

        // $sounds = $this->Sound->find('all');
        // $this->set(array(
        //     'sounds' => $sounds,
        //     '_serialize' => array('sounds')
        // ), $this->Paginator->paginate());
	}


/**
 * index method
 *
 * @return void
 */
	public function api() {
        $sounds = $this->Sound->find('all');
        $this->set(array(
            'sounds' => $sounds,
            '_serialize' => array('sounds')
        ));
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		if (!$this->Sound->exists($id)) {
			throw new NotFoundException(__('Invalid sound'));
		}
		$options = array('conditions' => array('Sound.' . $this->Sound->primaryKey => $id));
		$this->set('sound', $this->Sound->find('first', $options));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Sound->create();
			if ($this->Sound->save($this->request->data)) {
				$this->Session->setFlash(__('The sound has been saved.'));
				return $this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The sound could not be saved. Please, try again.'));
			}
		}
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		if (!$this->Sound->exists($id)) {
			throw new NotFoundException(__('Invalid sound'));
		}
		if ($this->request->is(array('post', 'put'))) {
			if ($this->Sound->save($this->request->data)) {
				$this->Session->setFlash(__('The sound has been saved.'));
				return $this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The sound could not be saved. Please, try again.'));
			}
		} else {
			$options = array('conditions' => array('Sound.' . $this->Sound->primaryKey => $id));
			$this->request->data = $this->Sound->find('first', $options);
		}
	}

/**
 * delete method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		$this->Sound->id = $id;
		if (!$this->Sound->exists()) {
			throw new NotFoundException(__('Invalid sound'));
		}
		$this->request->onlyAllow('post', 'delete');
		if ($this->Sound->delete()) {
			$this->Session->setFlash(__('The sound has been deleted.'));
		} else {
			$this->Session->setFlash(__('The sound could not be deleted. Please, try again.'));
		}
		return $this->redirect(array('action' => 'index'));
	}
}
