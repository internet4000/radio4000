<div class="sounds form">
<?php echo $this->Form->create('Sound'); ?>
	<fieldset>
		<legend><?php echo __('Add Sound'); ?></legend>
	<?php
		echo $this->Form->input('title');
		echo $this->Form->input('key');
		echo $this->Form->input('type');
		echo $this->Form->input('user_id');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit')); ?>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Sounds'), array('action' => 'index')); ?></li>
	</ul>
</div>
