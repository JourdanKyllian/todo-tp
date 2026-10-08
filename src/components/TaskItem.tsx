import React from 'react';
import { IonItem, IonCheckbox, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import './TaskItem.css';

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <IonItem lines="none" className="task-card">
      <IonCheckbox 
        slot="start" 
        checked={task.done} 
        onIonChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      
      <IonLabel className={task.done ? 'task-text-done' : 'task-text'}>
        {task.text}
      </IonLabel>
      
      <IonButton slot="end" fill="clear" color="medium" onClick={() => onDelete(task.id)}>
        <IonIcon icon={trashOutline} slot="icon-only" />
      </IonButton>
    </IonItem>
  );
};

export default TaskItem;
