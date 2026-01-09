import { useState } from 'react'
import './App.css'

function Card({ number, message, isFlipped, onClick }) {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-face card-front">
          {number}
        </div>
        <div className="card-face card-back">
          {message ? (
            <span className="message">{message}</span>
          ) : (
            <span className="empty-message">No message</span>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [cards, setCards] = useState([
    { id: 1, message: '', isFlipped: false },
    { id: 2, message: '', isFlipped: false }
  ])
  const [inputValue, setInputValue] = useState('')
  const [title, setTitle] = useState('Reveal')
  const [titleInput, setTitleInput] = useState('')

  const handleCardClick = (id) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ))
  }

  const assignMessage = (cardId) => {
    if (!inputValue.trim()) return

    setCards(cards.map(card =>
      card.id === cardId ? { ...card, message: inputValue.trim() } : card
    ))
    setInputValue('')
  }

  const assignTitle = () => {
    if (!titleInput.trim()) return
    setTitle(titleInput.trim())
    setTitleInput('')
  }

  const resetCards = () => {
    setCards(cards.map(card => ({ ...card, isFlipped: false })))
  }

  const clearAll = () => {
    setCards([
      { id: 1, message: '', isFlipped: false },
      { id: 2, message: '', isFlipped: false }
    ])
    setInputValue('')
    setTitle('Reveal')
    setTitleInput('')
  }

  return (
    <div className="app">
      <h1 className="title">{title}</h1>

      <div className="cards-container">
        {cards.map(card => (
          <Card
            key={card.id}
            number={card.id}
            message={card.message}
            isFlipped={card.isFlipped}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          className="message-input"
          placeholder="Set a title or question..."
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <div className="assign-buttons">
          <button
            className="assign-btn"
            onClick={assignTitle}
            disabled={!titleInput.trim()}
          >
            Set Title
          </button>
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="assign-buttons">
          <button
            className="assign-btn"
            onClick={() => assignMessage(1)}
            disabled={!inputValue.trim()}
          >
            Assign to Card 1
          </button>
          <button
            className="assign-btn"
            onClick={() => assignMessage(2)}
            disabled={!inputValue.trim()}
          >
            Assign to Card 2
          </button>
        </div>
      </div>

      <div className="assign-buttons">
        <button className="reset-btn" onClick={resetCards}>
          Hide Cards
        </button>
        <button className="reset-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  )
}

export default App
