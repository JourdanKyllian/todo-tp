import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonInput, IonButton 
} from '@ionic/react';
import TaskItem, { Task } from '../components/TaskItem';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Exécuté une seule fois au lancement de l'application
  useEffect(() => {
    const savedTasks = localStorage.getItem('my-todolist');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Chaque fois que le tableau tasks est modifié
  useEffect(() => {
    localStorage.setItem('my-todolist', JSON.stringify(tasks));
  }, [tasks]);

  // Ajouter une tâche
  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Task = {
        id: Date.now().toString(), // Génère un ID unique
        text: newTaskText,
        done: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText(''); // Vide le champ après ajout
    }
  };

  // Cocher/Décocher une tâche
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Supprimer une tâche
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todolist TP1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todolist</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Zone de création de tâche */}
        <IonItem>
          <IonInput 
            placeholder="Ajouter une tâche..." 
            value={newTaskText}
            onIonInput={(e: any) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <IonButton slot="end" onClick={addTask}>Ajouter</IonButton>
        </IonItem>

        {/* Liste des composants TaskItem */}
        <IonList>
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
    </IonPage>
  );
};

export default Home;
