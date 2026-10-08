import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonButtons, IonButton, IonIcon 
} from '@ionic/react';
import { addOutline, searchOutline } from 'ionicons/icons';
import TaskItem from '../components/TaskItem';
import AddTaskSheet from '../components/AddTaskSheet';
import { useTasks } from '../hooks/useTasks';
import './Home.css';

const Home: React.FC = () => {
  // Branchement du hook métier
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  // État local uniquement pour l'interface
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (text: string) => {
    addTask(text);
    setIsModalOpen(false); // Action consécutive gérée par le composant parent
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>ToDo</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={searchOutline} />
            </IonButton>
            <IonButton onClick={() => setIsModalOpen(true)}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ToDo</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList className="task-list">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          ))}
        </IonList>

        <AddTaskSheet 
          isOpen={isModalOpen} 
          onDidDismiss={() => setIsModalOpen(false)} 
          onAddTask={handleAddTask} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
