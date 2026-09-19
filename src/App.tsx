import { useState, useEffect, type SubmitEvent } from 'react';
import './App.css';

type UserData = {
  nome: string;
  email: string;
  cargo: string;
};

function App() {
  
  const [formData, setFormData] = useState<UserData>({ nome: '', email: '', cargo: '' });
  const [savedUser, setSavedUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');

  
  useEffect(() => {
    const dadosArmazenados = localStorage.getItem('@AppPratico:userData');
    if (dadosArmazenados) {
      setSavedUser(JSON.parse(dadosArmazenados));
    }
  }, []);

  
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

   
    if (!formData.nome.trim() || !formData.email.trim() || !formData.cargo.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    
    setError('');
    setSavedUser(formData);
    
    
    localStorage.setItem('@AppPratico:userData', JSON.stringify(formData));
    
    
    setFormData({ nome: '', email: '', cargo: '' });
  };

  
  const handleClearData = () => {
    localStorage.removeItem('@AppPratico:userData');
    setSavedUser(null);
  };

  return (
    <div className="container">
      <header>
        <h1>Cadastro Profissional</h1>
        <br/>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2><strong>Novo Cadastro</strong></h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nome">Nome Completo *</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Maria Silva"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Ex: maria@gmail.com"
              />
            </div>

            <div className="input-group">
              <label htmlFor="cargo">Cargo / Profissão *</label>
              <input
                type="text"
                id="cargo"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                placeholder="Ex: Motorista"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-primary">Salvar Dados</button>
          </form>
        </section>

       
        {savedUser && (
          <section className="result-section">
            <h2><strong>Dados Armazenados</strong></h2>
            <div className="card">
              <p><strong>Nome:</strong> {savedUser.nome}</p>
              <p><strong>E-mail:</strong> {savedUser.email}</p>
              <p><strong>Cargo:</strong> {savedUser.cargo}</p>
            </div>
            
            <button type="button" onClick={handleClearData} className="btn-danger">
              Limpar Dados Salvos
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;