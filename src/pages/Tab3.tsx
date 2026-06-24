import { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar, IonText
} from '@ionic/react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUser } from '../services/githubService'; // Importamos el servicio donde está la lógica de la API
import type { User } from '../interfaces/UserInterface';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        {/* Spinner de carga mientras llega la respuesta */}
        {loading && <LoadingSpinner message="Cargando perfil..." />}

        {/* Si ocurre un error, mostramos el mensaje al usuario */}
        {error && (
          <IonText color="danger" className="ion-padding">
            <p>{error}</p>
          </IonText>
        )}

        {/* Solo mostramos la tarjeta si no está cargando, no hay error y ya tenemos al usuario */}
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