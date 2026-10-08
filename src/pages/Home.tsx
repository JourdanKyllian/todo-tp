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
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (text: string) => {
    addTask(text);
  };

  const handleBackgroundClick = () => {
    if (isModalOpen) setIsModalOpen(false);
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

      <IonContent fullscreen onClick={handleBackgroundClick}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ToDo</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Le paddingBottom dynamique permet de scroller au-dessus de la modale */}
        <IonList 
          className="task-list" 
          style={{ paddingBottom: isModalOpen ? '35vh' : '32px' }}
        >
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          ))}
        </IonList>

      </IonContent>
      
      <AddTaskSheet 
        isOpen={isModalOpen} 
        onDidDismiss={() => setIsModalOpen(false)} 
        onAddTask={handleAddTask} 
      />
    </IonPage>
  );
};

export default Home;
