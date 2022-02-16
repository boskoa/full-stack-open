import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th></th><th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Users