import React from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail, useIonAlert } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { Repository, Owner } from '../interfaces/Repository';
import { updateRepo, deleteRepo } from '../services/githubService'; // Importamos PATCH y DELETE del service
import './RepoItem.css'

interface RepoItemProps {
  repository: Repository;
  onUpdated: () => void; // Nueva prop: callback que avisa a Tab1 que debe recargar la lista
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onUpdated }) => {
  // Hook de Ionic para mostrar un Alert (popup) con inputs y botones
  const [presentAlert] = useIonAlert();

  // Función que se ejecuta al presionar el icono del lápiz
  const handleEdit = () => {
    // Repository.owner solo tipa avatar_url, pero el dato real de GitHub sí trae login.
    // Usamos la interfaz Owner (que ya existe en tu archivo) para acceder a login sin error de TS.
    const ownerLogin = (repository.owner as Owner).login;

    presentAlert({
      header: 'Editar repositorio',
      // Ahora pedimos dos inputs: nombre y descripción, ambos prellenados
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nuevo nombre',
          value: repository.name
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Nueva descripción',
          value: repository.description ?? ''
        }
      ],
      buttons: [
        'Cancelar', // Botón simple, no hace nada
        {
          text: 'Guardar',
          handler: async (data) => {
            try {
              // ---- LLAMADA AL MÉTODO PATCH ----
              // 1er parámetro: ownerLogin -> dueño del repo (va en la URL)
              // 2do parámetro: repository.name -> nombre ACTUAL del repo (también va en la URL,
              //    GitHub lo necesita para saber CUÁL repo identificar/editar, no es el nuevo nombre)
              // 3er parámetro: el body del PATCH -> aquí SÍ van los valores NUEVOS
              //    que el usuario escribió en el alert (data.name, data.description)
              await updateRepo(ownerLogin, repository.name, {
                name: data.name,
                description: data.description
              });
              onUpdated(); // Avisamos a Tab1 para que recargue la lista (fetchData)
            } catch (err) {
              console.error('Error al actualizar el repositorio:', err);
            }
          }
        }
      ]
    });
  };

  // Función que se ejecuta al presionar el icono de la basura
  const handleDelete = () => {
    const ownerLogin = (repository.owner as Owner).login;

    // Confirmación obligatoria antes de eliminar (acción destructiva, según los requisitos)
    presentAlert({
      header: 'Eliminar repositorio',
      message: `¿Estás seguro de que deseas eliminar "${repository.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        'Cancelar', // No hace nada, solo cierra el alert
        {
          text: 'Eliminar',
          role: 'destructive', // Estilo visual rojo en el botón (iOS)
          handler: async () => {
            try {
              // ---- LLAMADA AL MÉTODO DELETE ----
              // Solo necesita ownerLogin y repository.name para armar la URL
              // (DELETE /repos/{owner}/{repo}). No se manda body porque
              // eliminar no requiere datos adicionales, solo identificar el repo.
              await deleteRepo(ownerLogin, repository.name);
              // IMPORTANTE: si esta línea se ejecuta sin error, el repo ya
              // fue borrado en GitHub. onUpdated() vuelve a pedir la lista
              // completa (fetchData en Tab1), así que el repo eliminado
              // simplemente deja de aparecer porque el GET ya no lo trae.
              onUpdated();
            } catch (err) {
              console.error('Error al eliminar el repositorio:', err);
            }
          }
        }
      ]
    });
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repository.owner.avatar_url} className="repo-avatar" alt="Avatar" />
        </IonThumbnail>
        <IonLabel>
          <h3>{repository.name}</h3>
          <p>{repository.description}</p>
          <p><strong>Lenguaje:</strong> {repository.language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        {/* Agregamos onClick al IonItemOption del lápiz */}
        <IonItemOption onClick={handleEdit}>
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>
        {/* Agregamos onClick al IonItemOption de la basura */}
        <IonItemOption color="danger" onClick={handleDelete}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;