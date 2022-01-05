import './App.css';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faTrash, faEdit, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';



function App() {
  let id = 6;

  const [tareas, setTareas] = useState([
    { id: 0, tarea: 'trabajo', completado: false },
    { id: 1, tarea: 'ejercicio', completado: false },
    { id: 2, tarea: 'tareas', completado: false },
    { id: 3, tarea: 'leer', completado: true },
    { id: 4, tarea: 'practicar futboll', completado: false },
    { id: 5, tarea: 'jugar', completado: false }
  ])


  const cambiar = (id) => {
    setTareas([
      ...tareas.map((tareas) => {
        if (tareas.id == id) {
          return {
            ...tareas,
            completado: !tareas.completado
          };
        } else {
          return tareas;
        }
      })
    ]);
  };

  // Agregar una tarea

  const [posicion, setPosicion] = useState(-1);

  const [nuevaTarea, setNuevaTarea] = useState({
    id: id,
    tarea: '',
    completado: false
  });

  const handleInput = (e) => {
    setNuevaTarea({
      ...nuevaTarea,
      tarea: e.target.value
    });
  };

  const guardarTarea = (e) => {
    e.preventDefault();
    setTareas([...tareas, nuevaTarea]);

    id++;

    setNuevaTarea({
      id: id,
      tarea: '',
      completado: false
    });
  };

  // Editar tarea

  const [edit, setEdit] = useState({
    id: id,
    tarea: '',
    completado: false

  });

  const editar = (tarea) => {
    setPosicion(tarea.id);
    setEdit(tarea)

  };

  const guardar = () => {
    setTareas([
      ...tareas.map((tarea) => {
        if (tarea.id == edit.id) {
          return edit;
        } else {
          return tarea;
        }
      })
    ]);
    setPosicion(-1);
  }

  const handleInputEdit = (e) => {
    setEdit({
      ...edit,
      tarea: e.target.value
    });

    console.log(e.target.value);
  };



  // Eliminar tarea

  const eliminarTarea = (id, tarea) => {
    let opcion = window.confirm('realmente desea Eliminar ');
    if (opcion) {
      setTareas([...tareas.filter((tarea) => tarea.id !== id)]);
    }

  };




  // Cambiar estado de la tarea

  const [estado, setEstado] = useState(0);

  const cambiarEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
  };

  return (
    <div className='container'>
      <section className='menu'>
        <FontAwesomeIcon icon={faAlignCenter} />
        <div>
          <h1>Website todo</h1>
        </div>
        <div></div>
      </section>

      <div className='caja-btn'>
        <div className="btn-estados">
          <button className={`${estado == 0 && 'active'}`} onClick={() => cambiarEstado(0)} type="button">
            Todos
          </button>
          <button className={`${estado == 1 && 'active'}`} onClick={() => cambiarEstado(1)} type="button">
            Sin completar
          </button>
          <button className={`${estado == 2 && 'active'}`} onClick={() => cambiarEstado(2)} type="button">
            Completadas
          </button>
        </div>
      </div>


      <div className='caja-lista'>
        {tareas.map((tarea, key) => {
          if (estado == 1 && tarea.completado != false) {
            return null;
          }
          if (estado == 2 && tarea.completado != true) {
            return null;
          }

          if (tarea.id != posicion) {
            return (
              <div className='lista' >
                <div className='lista-text'>
                  <input type="checkbox" checked={tarea.completado} onChange={() => cambiar(tarea.id)} />
                  <p>{tarea.tarea}</p>
                </div>
                <div className='lista-icon'>
                  <button className='edit' onClick={() => editar(tarea)}><FontAwesomeIcon icon={faEdit} /></button>
                  <button onClick={() => eliminarTarea(tarea.id)}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            )
          } else {
            return (<div className='lista' key={key}>
              <div className='lista-text'>
                <input type="text" name="tarea" id="" onChange={handleInputEdit} value={edit.tarea} />
              </div>
              <div className='lista-icon '>
                <button className='lista-icon-check' onClick={() => guardar()}><FontAwesomeIcon icon={faCheck} /></button>
                <button className='lista-icon-times' onClick={() => setPosicion(-1)}><FontAwesomeIcon icon={faTimes} /></button>
              </div>
            </div>)
          }
        })}



      </div>

      <div className='caja-input'>
        <form onSubmit={guardarTarea} className='item-input' >
          <input
            type="text"
            name="tarea"
            placeholder="Ingrese un tarea"
            onChange={handleInput}
            value={nuevaTarea.tarea}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </div>



    </div>
  );
}

export default App;
