import React from 'react';
import { IonItem, IonCheckbox, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

// Définit la structure d'une tâche
export interface Task {
  id: string;
  text: string;
  done: boolean;
}

// Définit les actions que le parent pourra envoyer au composant
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <IonItem>
      {/* Case à cocher à gauche */}
      <IonCheckbox 
        slot="start" 
        checked={task.done} 
        onIonChange={() => onToggle(task.id)} 
      />
      
      {/* Texte au milieu */}
      <IonLabel 
        style={{ textDecoration: task.done ? 'line-through' : 'none' }}
      >
        {task.text}
      </IonLabel>
      
      {/* Bouton poubelle à droite */}
      <IonButton slot="end" fill="clear" color="danger" onClick={() => onDelete(task.id)}>
        <IonIcon icon={trashOutline} slot="icon-only" />
      </IonButton>
    </IonItem>
  );
};

export default TaskItem;