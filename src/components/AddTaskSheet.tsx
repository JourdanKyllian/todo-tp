import React, { useState, useRef } from 'react';
import { IonModal, IonContent, IonItem, IonInput, IonButton } from '@ionic/react';

interface AddTaskSheetProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAddTask: (text: string) => void;
}

const AddTaskSheet: React.FC<AddTaskSheetProps> = ({ isOpen, onDidDismiss, onAddTask }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLIonInputElement>(null);

  const handleAdd = () => {
    if (text.trim() !== '') {
      onAddTask(text);
      setText(''); // Nettoie le champ pour la prochaine ouverture
    }
  };

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onDidDismiss}
      initialBreakpoint={0.25}
      breakpoints={[0, 0.25, 0.5]}
      onIonModalDidPresent={() => inputRef.current?.setFocus()}
    >
      <IonContent className="ion-padding">
        <IonItem lines="none" className="modal-input-item">
          <IonInput 
            ref={inputRef}
            placeholder="Que devez-vous faire ?" 
            value={text}
            onIonInput={(e: any) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            clearInput
          />
        </IonItem>
        <IonButton expand="block" shape="round" className="modal-add-button" onClick={handleAdd}>
          Créer la tâche
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddTaskSheet;
