import React from 'react'
import { Link } from 'react-router'
import useWorkspaces from '../../hooks/useWorkspaces.jsx'
import { FaArrowRightLong } from "react-icons/fa6";


/*
    Manejar la respuesta del servidor con useRequest o hook de preferencia para representar los estados en la pantalla, en especial el cargando y la lista de espacios de trabajo
    Cada espacio de trabajo debera mostrar el titulo y un link que diga "Abrir workspace" y lleve hacia "/workspace/:id_workspace"

    Recomendacion:
    Usen un efecto que se ejecute solo una vez para cargar la lista de espacios de trabajo
*/

const HomeScreen = () => {
  const { loading, error, workspaces } = useWorkspaces()

  console.log(
    {
      loading,
      error,
      workspaces
    }
  )

  return (
    <div>
      {loading &&
        <div className='flex items-center justify-center h-screen bg-indigo-500'>
          <div className='text-4xl text-white font-bold animate-ping'>
            <img className='w-20 mb-4' src="slack-logo.png" alt="" />
            <span>Slack</span>
          </div>
        </div>
      }
      {!loading && workspaces &&
        <div className='border p-6 h-screen  flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center gap-2 mb-8'>
            <img className='w-12' src="slack-logo.png" alt="" />
            <h1 className='text-4xl text-black font-bold'>Slack</h1>
          </div>
          <h2 className='text-2xl text-center max-w-lg font-bold text-indigo-900 mb-2'>Bienvenido de vuelta! <span className='text-black'>Te ves bien hoy.</span></h2>
          <p className='max-w-lg text-xl text-center text-slate-600'>Selecciona un espacio de trabajo para continuar trabajando con tu equipo.</p>
          {workspaces.length === 0
            ? <div className='mt-8 flex item-center justify-center'>
              <p className='text-xl text-slate-600 font-semibold'>No hay espacios de trabajo</p>
            </div>
            : workspaces.map(workspace => (
              <div className='mt-8 bg-white w-full max-w-2xl shadow-2xl  rounded-lg py-4' key={workspace.workspace_id}>
                <div className='px-8 py-4'><span className='text-lg text-slate-600  font-semibold'>Workspaces de {workspace.user_email}</span></div>
                <Link to={`/workspace/${workspace.workspace_id}`} className='text-xl group cursor-pointer transition-all duration-300'>
                  <div className='w-full gap- flex items-center justify-between border-y border-slate-200 gap-4 px-8 py-4 '>
                    <div className='flex items-center justify-between gap-4'>
                      <div className='flex items-start justify-between gap-8'>
                        {
                          workspace.workspace_img === ""
                            ? <img className='w-14 h-14 rounded-full' src="slack-logo.png" alt="" />
                            : <img className='w-14 h-14 rounded-full' src={workspace.workspace_img} alt="" />
                        }
                        <div className='flex items-start flex-col justify-center'>
                          <h3 className='text-xl font-bold'>{workspace.workspace_title}</h3>
                          <p className='text-lg text-slate-400'>{workspace.workspace_description}</p>
                        </div>
                      </div>
                    </div>
                    <FaArrowRightLong className='group-hover:translate-x-2 transition-all duration-300' />
                  </div>
                </Link>
              </div>
            ))
          }

        </div>
      }
    </div >
  )
}

export default HomeScreen