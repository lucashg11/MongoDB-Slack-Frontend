import React from 'react'
import { Link, useNavigate } from 'react-router'
import useWorkspaces from '../../hooks/useWorkspaces.jsx'
import { FaArrowRightLong } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";



/*
    Manejar la respuesta del servidor con useRequest o hook de preferencia para representar los estados en la pantalla, en especial el cargando y la lista de espacios de trabajo
    Cada espacio de trabajo debera mostrar el titulo y un link que diga "Abrir workspace" y lleve hacia "/workspace/:id_workspace"

    Recomendacion:
    Usen un efecto que se ejecute solo una vez para cargar la lista de espacios de trabajo
*/

const HomeScreen = () => {
  const { loading, error, workspaces } = useWorkspaces()

  const navigate = useNavigate();
  function handleClick() {
    navigate('/workspace/new')
  }
  return (
    <div className="h-full">
      {loading &&
        <div className='flex items-center justify-center h-full bg-indigo-500'>
          <div className='text-4xl text-white font-bold animate-pulse'>
            <img className='w-24 mb-4 mx-auto transition-transform duration-300 hover:scale-110' src="slack-logo.png" alt="" />
            <span>Slack</span>
          </div>
        </div>
      }
      {!loading && workspaces &&
        <div className='h-full w-full p-4 sm:p-8 bg-linear-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center'>
          <div className='flex flex-col w-full max-w-2xl'>
            <div className='flex items-center justify-center gap-3 mb-10 sm:mb-12'>
              <img className='w-14 h-14 transition-transform duration-300 hover:scale-110' src="slack-logo.png" alt="" />
              <h1 className='text-4xl sm:text-5xl text-black font-bold'>Slack</h1>
            </div>
            <h2 className='text-2xl sm:text-3xl text-center font-bold text-indigo-900 mb-4'>Bienvenido de vuelta! <span className='text-black'>Te ves bien hoy.</span></h2>
            <p className='text-lg sm:text-xl text-center text-slate-600 mb-10'>Selecciona un espacio de trabajo para continuar trabajando con tu equipo.</p>

            {workspaces.length === 0
              ? <div className='flex items-center justify-center py-16'>
                <p className='text-lg sm:text-xl text-slate-500 font-medium'>No hay espacios de trabajo creados</p>
              </div>
              :
              <div className='bg-white w-full shadow-xl rounded-2xl overflow-hidden mb-10 transition-all duration-300'>
                <div className='px-6 sm:px-8 py-5 flex items-center gap-3 bg-slate-50 border-b border-slate-200'>
                  <MdSpaceDashboard className='text-3xl text-slate-600' />
                  <span className='text-lg sm:text-xl text-slate-700 font-semibold'>Mis espacios de trabajo</span>
                </div>
                <div className='divide-y divide-slate-200 max-h-[400px] overflow-y-auto custom-scrollbar'>
                  {workspaces.map(workspace => (
                    <Link key={workspace.workspace_id} to={`/workspace/${workspace.workspace_id}`} className='block transition-all duration-300 hover:bg-indigo-50'>
                      <div className='w-full flex items-center justify-between gap-4 sm:gap-6 px-6 sm:px-8 py-5 hover:shadow-sm transition-all duration-300'>
                        <div className='flex items-center gap-4 sm:gap-6 flex-1 min-w-0'>
                          <div className='shrink-0'>
                            {workspace.workspace_img === ""
                              ? <img className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover transition-transform duration-300 hover:scale-105' src="slack-logo.png" alt="" />
                              : <img className='w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover transition-transform duration-300 hover:scale-105' src={workspace.workspace_img} alt="" />
                            }
                          </div>
                          <div className='flex flex-col justify-center min-w-0'>
                            <h3 className='text-lg sm:text-xl font-bold text-slate-900 truncate'>{workspace.workspace_title}</h3>
                            <p className='text-sm sm:text-base text-slate-500 truncate'>{workspace.workspace_description || 'Sin descripción'}</p>
                          </div>
                        </div>
                        <FaArrowRightLong className='text-slate-400 transition-all duration-300 group-hover:translate-x-2 shrink-0' />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            }
            <button 
              onClick={handleClick}
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              Crear espacio de trabajo
            </button>
          </div>
        </div>
      }
    </div >
  )
}

export default HomeScreen