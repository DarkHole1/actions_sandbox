function TaskHeader({ task: {artist, track, network, type} }) {
  return `${artist} - ${track} (${network}, ${type})`;
}

export default TaskHeader;
