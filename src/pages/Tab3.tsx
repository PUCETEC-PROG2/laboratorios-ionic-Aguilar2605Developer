import { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar, IonText
} from '@ionic/react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUser } from '../services/githubService'; // CONEXIÓN con el service: traemos solo GET del usuario autenticado
import type { User } from '../interfaces/UserInterface';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Este tab usa useEffect (con [] como dependencia), no useIonViewWillEnter como Tab1.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUser(); // getUser() ya devuelve el objeto User (no hace falta .data)
        setUser(response);
      } catch (err) {
        setError('No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Spinner de carga */}
        {loading && <LoadingSpinner message="Cargando perfil..." />}

        {/* Mensaje de error */}
        {error && (
          <IonText color="danger" className="ion-padding">
            <p>{error}</p>
          </IonText>
        )}
        {!loading && !error && user && (
          <IonCard className="profile-card">
            <IonCardHeader className="profile-header">
              <IonAvatar className="profile-avatar">
                <img src={user.avatar_url} alt={user.login} />
              </IonAvatar>
              <IonCardTitle>{user.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="profile-content">
              <p>{user.bio}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;