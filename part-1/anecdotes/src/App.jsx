import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [maxIndex, setMaxIndex] = useState(0);

  const handleRandomizer = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    setMaxIndex(
      copy.reduce(
        (maxIndex, elem, i) => (elem > copy[maxIndex] ? i : maxIndex),
        0
      )
    );
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes </div>
      <Button onClick={handleRandomizer} text="random" />
      <Button onClick={handleVote} text="vote" />
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[maxIndex]}</div>
    </div>
  );
};

export default App;
