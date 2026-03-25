import React from 'react'
import { Link } from 'react-router'
import useWorkspaces from '../../hooks/useWorkspaces.jsx'

/*
    Manejar la respuesta del servidor con useRequest o hook de preferencia para representar los estados en la pantalla, en especial el cargando y la lista de espacios de trabajo
    Cada espacio de trabajo debera mostrar el titulo y un link que diga "Abrir workspace" y lleve hacia "/workspace/:id_workspace"

    Recomendacion:
    Usen un efecto que se ejecute solo una vez para cargar la lista de espacios de trabajo
*/

const HomeScreen = () => {
  const { loading, error, workspaces } = useWorkspaces()

  return (
    <div>
      {loading && <p className='text-xl'>Cargando...</p>}
      {!loading && workspaces &&
        <div>
          {workspaces.length === 0
            ? <p>No hay espacios de trabajo</p>
            : workspaces.map(workspace => (
              <div key={workspace.workspace_id} className='w-full gap-2 h-full flex flex-col items-start justify-between p-2'>
                <h3 className='text-xl font-bold'>{workspace.workspace_title}</h3>
                <p className='text-lg text-slate-400'>{workspace.workspace_description}</p>
                <Link to={`/workspace/${workspace.workspace_id}`} className='text-xl px-8 py-2 rounded-xl bg-blue-500 text-white'>Abrir workspace</Link>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default HomeScreen