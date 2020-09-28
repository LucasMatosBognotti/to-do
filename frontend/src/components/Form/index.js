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
    }).then(() => {
      alert('Cadastro realizado com sucesso');
    }).catch(() => {'Erro no cadastro'});

  }, [description, who, where, priority]);

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

    <div className="container">
      Lista de tarefas
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Quem</th>
            <th>Onde</th>
            <th>Prioridade</th>
            <th>Criada em</th>
          </tr>
        </thead>
        <tbody>
          {lists.map(list => (
            <tr key={list.id}>
              <td>{list.description}</td>
              <td>{list.who}</td>
              <td>{list.where}</td>
              <td>{list.priority}</td>
              <td>{list.formatDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Form;
