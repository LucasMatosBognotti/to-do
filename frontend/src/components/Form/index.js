import React, { useCallback, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

function Form() {
  const [description, setDescription] = useState('');
  const [who, setWho] = useState('');
  const [where, setWhere] = useState('');
  const [priority, setPriority] = useState('');
  const [lists, setList] = useState(['']);

  const handleCreate = useCallback(async (e) => {
    e.preventDefault();

    await api.post('todo', {
      description,
      who,
      where,
      priority
    })
    .then((response) => {    
      const formatDate = format(parseISO(response.data.date), 'dd/MM/yyyy');
      setList([...lists, Object.assign({ formatDate }, response.data)])
    })
    .catch(() => { alert('Erro no cadastro')})

  }, [description, who, where, priority, lists]);

  const handleRemove = useCallback(async (id) => {
    await api.delete(`/todo/${id}`);
    setList(lists.filter(list => list._id !== id));
  }, [lists]);

  const handleUpdate = useCallback(async (item) => {
    const response = await api.put(`/todo/${item._id}`, {
      done: item.done === true ? false : true
    });

    const formatDate = format(parseISO(response.data.date), 'dd/MM/yyyy');

    lists[lists.findIndex(list => list._id === item._id)] = Object.assign({ formatDate }, response.data);
    
    setList(lists.map(list => list));

  }, [lists]);

  useEffect(() => {
    api.get('todos').then(response => {
      const data = response.data.map(list => ({
        ...list,
        formatDate: format(parseISO(list.date), 'dd/MM/yyyy'),
      }));
      setList(data);
    })
  }, []);

  return (
    <>
    <form onSubmit={handleCreate}>
      <div className="form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => { setDescription(e.target.value)} }
          />
        </div>

        <div className="form-group">
          <label htmlFor="who">Quem</label>
          <input
            className="form-control"
            type="text"
            value={who}
            onChange={e => setWho(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="where">Onde</label>
          <input
            className="form-control"
            type="text"
            value={where}
            onChange={e => setWhere(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Prioridade</label>
          <input
            className="form-control"
            type="number"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          />
        </div>
      
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Cadastrar
          </button>
        </div>
      </div>
    </form>

    <div className="table-responsive">
      Lista de tarefas
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quem</th>
            <th scope="col">Onde</th>
            <th scope="col">Prioridade</th>
            <th scope="col">Criada em</th>
            <th scope="col">Remove</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(list => (
            <tr key={list._id}>
              <td scope="row">{list._id}</td>
              <td>{list.description}</td>
              <td>{list.who}</td>
              <td>{list.where}</td>
              <td>{list.priority}</td>
              <td>{list.formatDate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemove(list._id)}
                >
                  Remove
                </button>
              </td>
              <td>
                <button
                  style={list.done ? { display: 'none' } : null}
                  className="btn btn-warning"
                  type="button"
                  onClick={() => handleUpdate(list)}
                >
                  Marcar como feita
                </button>

                <button
                  style={!list.done ? { display: 'none' } : null}
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleUpdate(list)}
                >
                  Marcar como desfeita
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Form;
