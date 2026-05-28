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
    <form onSubmit={handleSubmit} style={styles.container}>
      <div style={styles.inputWrapper}>
        <Search size={18} color="var(--fds-dark-mode-gray-50)" />
        <input 
          type="text" 
          maxLength="6"
          placeholder="Search by 6-digit code..." 
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          style={styles.input}
          disabled={loading}
        />
      </div>
    </form>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    border: '1px solid var(--fds-dark-mode-gray-35)',
    borderRadius: 'var(--radius-xl)',
    padding: '8px 16px',
    width: '100%',
    gap: '10px'
  },
  input: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
    color: 'var(--text-primary)'
  }
};

export default SearchBar;
