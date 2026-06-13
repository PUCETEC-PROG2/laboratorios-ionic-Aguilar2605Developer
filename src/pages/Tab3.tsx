import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar 
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonCard className="profile-card">
          <IonCardHeader className="profile-header">
            <IonAvatar className="profile-avatar">
              <img src="https://download-warehouse.sketchup.com/warehouse/v1.0/content/public/a27b0928-759c-43c2-b4e6-a44af9311ffb" alt="Perfil" />
            </IonAvatar>
            <IonCardTitle>Julian Solorzano</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="profile-content">
            <p>Perfil: Estudiante de PUCETEC de la carrera "DESARROLLO DE SOFTWARE"</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;