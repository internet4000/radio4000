<div class="sounds view">
<h2><?php echo __('Sound'); ?></h2>
	<dl>
		<dt><?php echo __('Id'); ?></dt>
		<dd>
			<?php echo h($sound['Sound']['id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Title'); ?></dt>
		<dd>
			<?php echo h($sound['Sound']['title']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Type'); ?></dt>
		<dd>
			<?php echo h($sound['Sound']['type']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('User Id'); ?></dt>
		<dd>
			<?php echo h($sound['Sound']['user_id']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Created'); ?></dt>
		<dd>
			<?php echo h($sound['Sound']['created']); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Modified'); ?></dt>
		<dd>
			<?php echo h($sound['Sound']['modified']); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Sound'), array('action' => 'edit', $sound['Sound']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Sound'), array('action' => 'delete', $sound['Sound']['id']), null, __('Are you sure you want to delete # %s?', $sound['Sound']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Sounds'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Sound'), array('action' => 'add')); ?> </li>
	</ul>
</div>
