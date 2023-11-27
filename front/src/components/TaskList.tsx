import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

const tasks = ['Task 1', 'Task 2', 'Task 3'];

const TaskList: React.FC = () => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemText primary={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
