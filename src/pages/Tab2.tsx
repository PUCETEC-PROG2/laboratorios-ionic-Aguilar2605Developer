import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonTextarea, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DM - IONIC</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="tab2-content">
        <IonCard className="form-card">
          <IonCardHeader>
            <IonCardTitle>Nuevo Repositorio</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput className="form-input" label="Nombre:" labelPlacement="floating" placeholder="Ej: Mi proyecto" />
            <IonTextarea className="form-input" label="Descripción:" labelPlacement="floating" placeholder="Escribe aquí..." />
            <IonInput className="form-input" label="Lenguaje:" labelPlacement="floating" placeholder="Ej: TypeScript - Python - Javascript " />
            <IonButton expand="block" className="save-button">
              Guardar
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;