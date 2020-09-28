import React from 'react';

import Form from '../../components/Form';
import PageHeader from '../../components/PageHeader';

function Todo() {
  return (
    <div className="container">
      <PageHeader title="Tarefa" subtitle="Cadastro" />
      <Form />
    </div>
  );
}

export default Todo;
