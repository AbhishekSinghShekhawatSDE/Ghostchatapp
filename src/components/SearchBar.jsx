import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/designTokens.css';

const SearchBar = ({ onSearch, loading }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      onSearch(code);
      setCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input 
        type="text" 
        placeholder="Enter 6-digit code" 
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        className="glass-input"
        style={styles.input}
      />
      <button 
        type="submit" 
        className="glass-button"
        style={{...styles.button, opacity: loading || code.length !== 6 ? 0.5 : 1}}
        disabled={loading || code.length !== 6}
      >
        <Search size={18} />
      </button>
    </form>
  );
};

const styles = {
  input: {
    flex: 1,
    fontFamily: 'monospace',
    letterSpacing: '2px',
    fontSize: '16px',
    textAlign: 'center',
  },
  button: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default SearchBar;
