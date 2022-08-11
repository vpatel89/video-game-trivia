import React from 'react';

const LeaderboardTable = (props) => {
  const topScores = props.highScores;

  const tableRows = topScores.map(
    (element) => {
      return(
        <tr>
          <td>{element.username}</td>
          <td>{element.score}</td>
        </tr>
      )
    }
  )

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export default LeaderboardTable;