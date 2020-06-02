import React, {
 useState, useEffect, useMemo, useCallback
} from 'react';

function App() {
  const [tech, setTech] = useState(['ReactJs', 'ReactNative']);
  const [newTech, setNewTech] = useState('');
  const add = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  onchange = (e) => {
    setNewTech(e.target.value);
  };
  useEffect(() => {
    const local = localStorage.getItem('tech');
    if (local) {
      setTech(JSON.parse(local));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  const tamanho = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>teste {tamanho}</strong>
      <br />
      <input value={newTech} onChange={onchange} />
      <button type="button" onClick={add}>
        Adicionar
      </button>
    </>
  );
}

export default App;
