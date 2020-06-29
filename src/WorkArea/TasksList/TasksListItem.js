import React from 'react';

function taskProgress(progress) {
  if(100 <= progress) return 'done';
  if(50 <= progress) return 'processing';

  return 'insufficient';
}

class TasksListItem extends React.Component {
  onClick = e => {
    e.preventDefault();
    this.props.onClick(this.props.id);
  }

  style() {
    const styles = ['task-list-item'];
    styles.push('task-progress-' + taskProgress(this.props.process));
    return styles.join(' ');
  }

  render() {
    const { artist, track, network, type, date } = this.props;
    const title = `${artist} - ${track} (${network}, ${type})`;
    return (
      <tr className={this.style()} onClick={this.onClick}>
        <td className="task-title">{title}</td>
        <td>{date}</td>
      </tr>
    );
  }
}

export default TasksListItem;
