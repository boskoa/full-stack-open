import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div style={{ color: 'orange' }}>
      <h2>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell><TableCell style={{ color: 'orange' }}>
              blogs created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => <TableRow key={user.id}>
            <TableCell>
              <Link to={`/users/${user.id}`} style={{ color: 'orange' }}>
                {user.name}
              </Link>
            </TableCell>
            <TableCell style={{ color: 'orange' }}>{user.blogs.length}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users